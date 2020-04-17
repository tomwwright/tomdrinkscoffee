# Coffee Ingestion

```sh

export BUCKET=textract-console-ap-southeast-2-42392ecb-fda1-49ec-922b-c7037b7
export KEY=statement-2020-01.pdf

# upload .pdf to S3
aws s3 cp $KEY s3://$BUCKET

# run Textract against .pdf to find tables
python textract_pdf.py $BUCKET $KEY textract_output.json

# run table parser against Textract output
python parse_tables.py textract_output.json
```

## Textract Notes

Pricing https://aws.amazon.com/textract/pricing/

Textract costs `$0.0195 per page ($19.50 per 1k)` -- definitely want to minimise unnecessary Textract `AnalyzeDocument` calls.

Upload to S3 -> Analyse with Textract -> Copy result to S3 -> Ingestion

## Camelot

This may be a viable alternative to Textract given that the .pdf in question is text-based

https://camelot-py.readthedocs.io/en/master/index.html

```python
import camelot
tables = camelot.read_pdf("statement-2020-01.pdf", flavor='stream', edge_tol=100, pages='all')
for index, table in enumerate(tables):
  print(table.df.to_csv())
```
