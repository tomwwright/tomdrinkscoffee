import pandas
import sys
import re

def main(input_csv, year):
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
      datetime = pandas.to_datetime(current_date + ' ' + date_or_time, infer_datetime_format=True)
  
      description = str(series.get(2))
      amount = float(series.get(4).replace('$', '').replace(',', ''))

      coffee_lookup = {
        'SQ *COFFEE PLUS OF': 5.0,
        'SQ *LITTLE TEMPERANC': 5.0,
        '7-ELEVEN': 2.0,
        'DIRTY APRON': 4.3
      }

      is_coffee = False
      lookup_amount = 0
      for key, value in coffee_lookup.items():
        if key in description:
          is_coffee = True
          lookup_amount = min(value, amount)

      if is_coffee:
        print(f"{str(datetime)} @ {description} for ${lookup_amount} (${amount})")
        coffees.append({
          'datetime': str(datetime),
          'description': description,
          'amount': amount
        })
  
  coffees.sort(key=lambda coffee: coffee['datetime'])

  return coffees

if __name__ == "__main__":
  
  coffees = main(sys.argv[1], sys.argv[2])
  print(coffees)