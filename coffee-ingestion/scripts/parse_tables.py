import json
import sys


def get_rows_columns_map(table_result, blocks_map):
  rows = {}
  for relationship in table_result['Relationships']:
    if relationship['Type'] == 'CHILD':
      for child_id in relationship['Ids']:
        cell = blocks_map[child_id]
        if cell['BlockType'] == 'CELL':
          row_index = cell['RowIndex']
          col_index = cell['ColumnIndex']
          if row_index not in rows:
            # create new row
            rows[row_index] = {}

          # get the text value
          rows[row_index][col_index] = get_text(cell, blocks_map)
  return rows


def get_text(result, blocks_map):
  text = ''
  if 'Relationships' in result:
    for relationship in result['Relationships']:
      if relationship['Type'] == 'CHILD':
        for child_id in relationship['Ids']:
          word = blocks_map[child_id]
          if word['BlockType'] == 'WORD':
            text += word['Text'] + ' '
          if word['BlockType'] == 'SELECTION_ELEMENT':
            if word['SelectionStatus'] == 'SELECTED':
              text += 'X '
  return text


def generate_table_csv(rows):

  csv = ''

  for _, cols in rows.items():

    for _, text in cols.items():
      csv += '{}'.format(text) + ","
    csv += '\n'

  return csv


def collect_blocks(pages):
  blocks_map = {}
  table_blocks = []

  for page in pages:
    blocks = page['Blocks']

    for block in blocks:
      blocks_map[block['Id']] = block
      if block['BlockType'] == "TABLE":
        table_blocks.append(block)

  return blocks_map, table_blocks


def main(file_name):

  with open(file_name, 'r') as file:
    textract = json.loads(file.read())

  blocks_map, table_blocks = collect_blocks(textract)

  assert len(table_blocks) > 0

  csv = ''
  for index, table in enumerate(table_blocks):
    rows = get_rows_columns_map(table, blocks_map)

    csv += 'Table_' + str(index) + '\n\n'
    csv += generate_table_csv(rows)
    csv += '\n'

  print(csv)


if __name__ == "__main__":
  file_name = sys.argv[1]
  main(file_name)
