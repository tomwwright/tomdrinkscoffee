import boto3
import time
import sys
import json


def start_job(s3BucketName, objectName):
  response = None
  client = boto3.client('textract')
  response = client.start_document_analysis(
      DocumentLocation={
          'S3Object': {
              'Bucket': s3BucketName,
              'Name': objectName
          }
      },
      FeatureTypes=['TABLES'])

  return response["JobId"]


def is_job_complete(jobId):
  time.sleep(5)
  client = boto3.client('textract')
  response = client.get_document_analysis(JobId=jobId)
  status = response["JobStatus"]
  print("Job status: {}".format(status))

  while(status == "IN_PROGRESS"):
    time.sleep(5)
    response = client.get_document_analysis(JobId=jobId)
    status = response["JobStatus"]
    print("Job status: {}".format(status))

  return status


def get_job_results(jobId):

  pages = []

  time.sleep(5)

  client = boto3.client('textract')
  response = client.get_document_analysis(JobId=jobId)

  pages.append(response)
  print("ResultSet page received: {}".format(len(pages)))
  next_token = None
  if('NextToken' in response):
    next_token = response['NextToken']

  while(next_token):
    time.sleep(1)

    response = client.get_document_analysis(JobId=jobId, NextToken=next_token)

    pages.append(response)
    print("ResultSet page received: {}".format(len(pages)))
    next_token = None
    if('NextToken' in response):
      next_token = response['NextToken']

  return pages


if __name__ == "__main__":

  s3_bucket_name = sys.argv[1]
  s3_document_key = sys.argv[2]
  output_filename = sys.argv[3]

  job_id = start_job(s3_bucket_name, s3_document_key)
  print("Started job with id: {}".format(job_id))
  if(is_job_complete(job_id)):
    response = get_job_results(job_id)

  with open(output_filename, "w") as fout:
    fout.write(json.dumps(response))
