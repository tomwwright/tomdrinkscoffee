
from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute, NumberAttribute
)
from datetime import datetime
import logging
import uuid


def define_coffee_model(dynamodb_table_name, dynamodb_table_region):
  logging.info(f"Coffee model created table={dynamodb_table_name} region={dynamodb_table_region}")

  class Coffee(Model):
    class Meta:
      table_name = dynamodb_table_name
      region = dynamodb_table_region
    id = UnicodeAttribute(hash_key=True)
    __typename = UnicodeAttribute(default="Coffee")
    amount = NumberAttribute(default=0)
    description = UnicodeAttribute()
    datetime = UnicodeAttribute()
    createdAt = UnicodeAttribute()
    updatedAt = UnicodeAttribute()

  return Coffee


def find_coffees_by_month(Coffee, year, month):
  datetime_prefix = f"{year}-{month}-"
  logging.info(f"Finding coffees by month year={year} month={month}")
  coffees = list(Coffee.scan(Coffee.datetime.startswith(datetime_prefix)))
  logging.info(f"Found {len(coffees)} coffees")

  return coffees


def delete_coffees_by_month(Coffee, year, month):
  coffees_of_month = find_coffees_by_month(Coffee, year, month)

  with Coffee.batch_write() as batch:
    for coffee in coffees_of_month:
      logging.info(f"Deleting coffee id={coffee.id} datetime={coffee.datetime}")
      batch.delete(coffee)


def create_coffee(Coffee, data):
  coffee = Coffee()
  coffee.id = str(uuid.uuid4())
  coffee.description = data['description']
  coffee.amount = float(data['amount'])
  coffee.datetime = datetime.fromisoformat(data['datetime']).isoformat()
  coffee.createdAt = datetime.now().isoformat()
  coffee.updatedAt = datetime.now().isoformat()

  return coffee


def insert_coffee_transactions(dynamodb_table_name, dynamodb_table_region, year, month, coffees_data):

  Coffee = define_coffee_model(dynamodb_table_name, dynamodb_table_region)

  delete_coffees_by_month(Coffee, year, month)

  with Coffee.batch_write() as batch:
    for data in coffees_data:
      coffee = create_coffee(Coffee, data)
      logging.info(f"Inserting coffee datetime={coffee.datetime}")
      batch.save(coffee)
