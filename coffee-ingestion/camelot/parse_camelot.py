import boto3
import camelot
import pandas
import sys
import os
from urllib.parse import urlparse

def parse_camelot(input_pdf, output_csv):
  tables = camelot.read_pdf(input_pdf, flavor='stream', edge_tol=100, pages='all')
  
  dfs = list(map(lambda table: table.df, tables))

  csv = pandas.concat(dfs).to_csv(header=False, index=False)
  
  with open(temporary_csv, 'w') as f:
    f.write(csv)

def parse_s3_uri(uri):
  parsed = urlparse(uri)
  return parsed.netloc, parsed.path.lstrip('/')

if __name__ == "__main__":
  input_s3_uri = os.environ['INPUT_S3_URI']
  output_s3_uri = os.environ['OUTPUT_S3_URI']

  input_bucket, input_key = parse_s3_uri(input_s3_uri)
  output_bucket, output_key = parse_s3_uri(output_s3_uri)

  temporary_pdf = 'input.pdf'
  temporary_csv = 'output.csv'

  s3 = boto3.client('s3')

  print(f"Downloading input .pdf file: {input_s3_uri} -> {temporary_pdf}")
  with open(temporary_pdf, 'wb') as f:
    s3.download_fileobj(input_bucket, input_key, f)

  print(f"Parsing input .pdf with Camelot: {temporary_pdf} -> {temporary_csv}")
  parse_camelot(temporary_pdf, temporary_csv)

  print(f"Uploading output .csv: {temporary_csv} -> {output_s3_uri}")

  s3.upload_file(temporary_csv, output_bucket, output_key)

  

