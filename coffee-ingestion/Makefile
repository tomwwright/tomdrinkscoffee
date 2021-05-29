.PHONY: deploy build-pandas-layer

STACK_NAME := coffee-ingestion-dev
DYNAMODB_TABLE_NAME := Coffee-jt3blw4hirbofastsqjm6dfb3e-develop
FARGATE_SUBNET_ID := subnet-f8aa119d
FARGATE_SECURITY_GROUP_ID := sg-9eb6d6fb

deploy: build-pandas-layer deploy-cloudformation

deploy-ecr-image:
	docker build -t camelot camelot
	docker tag camelot:latest 933397847440.dkr.ecr.ap-southeast-2.amazonaws.com/coffe-camel-1eif6efya2jeh:latest
	docker push 933397847440.dkr.ecr.ap-southeast-2.amazonaws.com/coffe-camel-1eif6efya2jeh:latest

deploy-cloudformation:
	sam build --template sam.cfn.yml
	sam package --s3-bucket amplify-tomdrinkscoffee-develop-144336-deployment  --output-template-file sam.out.cfn.yml
	aws cloudformation deploy --parameter-overrides DynamoDBTableName=${DYNAMODB_TABLE_NAME} FargateSubnetId=${FARGATE_SUBNET_ID} FargateSecurityGroupId=${FARGATE_SECURITY_GROUP_ID} --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM --template-file sam.out.cfn.yml

PANDAS_PYTHON_VERSION := python3.7
build-pandas-layer:
	mkdir -p pandas/python
	docker run --rm \
	-v ${PWD}/pandas:/build -w /build \
	lambci/lambda:build-${PANDAS_PYTHON_VERSION} \
    pip install -r requirements.txt -t python --ignore-installed

reprocess-statements: BUCKET=coffee-ingestion-dev-s3bucket-yuuytb4nlo5j
reprocess-statements:
	aws s3 cp --recursive s3://${BUCKET}/statements s3://${BUCKET}/uploads


