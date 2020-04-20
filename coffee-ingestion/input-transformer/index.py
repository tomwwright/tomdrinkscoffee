import re


def handler(event, context):
  bucket = event['detail']['requestParameters']['bucketName']
  input_key = event['detail']['requestParameters']['key']

  match = re.search(r'.*statement\-(\d{4})\-(\d{2})\.pdf', input_key)

  return {
      'inputPdfS3Uri': f"s3://{bucket}/{input_key}",
      'outputCsvS3Uri': f"s3://{bucket}/camelot-outputs/{input_key}.csv",
      'year': match.group(1),
      'month': match.group(2)
  }
