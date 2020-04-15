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
