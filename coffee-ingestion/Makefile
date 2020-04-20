.PHONY: deploy

STACK_NAME := coffee-ingestion-dev
DYNAMODB_TABLE_NAME := Coffee-jt3blw4hirbofastsqjm6dfb3e-develop
FARGATE_SUBNET_ID := subnet-f8aa119d
FARGATE_SECURITY_GROUP_ID := sg-9eb6d6fb

deploy:
	sam build --template sam.cfn.yml
	sam package --s3-bucket amplify-tomdrinkscoffee-develop-144336-deployment  --output-template-file sam.out.cfn.yml
	aws cloudformation deploy --parameter-overrides DynamoDBTableName=${DYNAMODB_TABLE_NAME} FargateSubnetId=${FARGATE_SUBNET_ID} FargateSecurityGroupId=${FARGATE_SECURITY_GROUP_ID} --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM --template-file sam.out.cfn.yml