import pandas
from urllib.parse import urlparse
import sys
import re
import boto3
import os
from dynamodb import insert_coffee_transactions
import logging
from datetime import datetime
import pytz

def build_coffee_lookup():
  return {
      'SQ *COFFEE PLUS OF': 5.0,    # Coffe + Office, Fitzroy
      'SQ *LITTLE TEMPERANC': 5.0,  # Little Temperance, Melbourne
      '7-ELEVEN': 2.0,              # 7-Eleven (Any)
      'DIRTY APRON': 4.3,           # Dirty Apron, Clifton Hill
      'LFAC, RICHMOND': 5.0,        # Little Frenchie and Co., Richmond
      'A THOUSAND BLESSINGS, RICHMOND': 5.0,  # A Thousand Blessings, Richmond
      'SMP*St James Richmond': 5.0, # St. James, Richmond
      'VERTUE COFFEE': 4.50,        # Vertue Coffee Roasters, Richmond
  }

def parse_coffee_transactions(input_csv, year):
  data = pandas.read_csv(input_csv, header=None)

  current_date = None

  coffees = []

  for _, series in data.iterrows():
    date_or_time = str(series.get(0))

    is_date_row = date_or_time.startswith('Sunday') \
        or date_or_time.startswith('Monday') \
        or date_or_time.startswith('Tuesday') \
        or date_or_time.startswith('Wednesday') \
        or date_or_time.startswith('Thursday') \
        or date_or_time.startswith('Friday') \
        or date_or_time.startswith('Saturday')

    if is_date_row:
      current_date = date_or_time + ' ' + year
      continue

    is_transaction = re.match(r'\d+:\d+(am|pm)', date_or_time)
    if is_transaction:
      dt = pandas.to_datetime(current_date + ' ' + date_or_time, infer_datetime_format=True)

      description = str(series.get(2))

      coffee_lookup = build_coffee_lookup()

      is_coffee = False
      lookup_amount = 0
      for key, value in coffee_lookup.items():
        if key in description:
          is_coffee = True
          amount = float(series.get(4).replace('$', '').replace(',', ''))
          lookup_amount = min(value, amount)

      if is_coffee:

        tz = pytz.timezone("Australia/Melbourne")

        coffees.append({
            'datetime': tz.localize(datetime.fromisoformat(str(dt))).isoformat(timespec='milliseconds'),
            'description': description,
            'amount': lookup_amount
        })

  coffees.sort(key=lambda coffee: coffee['datetime'])

  return coffees


def parse_s3_uri(uri):
  parsed = urlparse(uri)
  return parsed.netloc, parsed.path.lstrip('/')


def main(csv_s3_uri, year, month):
  bucket, key = parse_s3_uri(csv_s3_uri)
  temporary_csv = '/tmp/output.csv'
  dynamodb_table_name = os.environ['DYNAMODB_TABLE_NAME']
  dynamodb_table_region = os.environ['AWS_REGION']

  s3 = boto3.client('s3')

  logging.info(f"Downloading .csv file: {csv_s3_uri} -> {temporary_csv}")
  with open(temporary_csv, 'wb') as f:
    s3.download_fileobj(bucket, key, f)

  logging.info(f"Parsing .csv for coffee transactions: {temporary_csv}")
  coffees = parse_coffee_transactions(temporary_csv, year)

  logging.info(
      f"Inserting coffee transactions into DynamoDB: {dynamodb_table_name} ({len(coffees)} coffees)")
  insert_coffee_transactions(dynamodb_table_name, dynamodb_table_region, year, month, coffees)


def handler(event, context):
  logging.getLogger().setLevel(logging.INFO)

  csv_s3_uri = event['outputCsvS3Uri']
  year = event['year']
  month = event['month']

  main(csv_s3_uri, year, month)


if __name__ == "__main__":
  logging.getLogger().setLevel(logging.INFO)

  main(sys.argv[1], sys.argv[2], sys.argv[3])
