# tomdrinkscoffee.

Parsing of `.pdf` bank statements from [Up](up.com.au) to chart regular coffee expenditure :thinking:

Toy project for learning :notebook_with_decorative_cover:

[AWS Amplify](aws-amplify.github.io)

[AWS AppSync](https://aws.amazon.com/appsync/)

[AWS SAM](https://aws.amazon.com/serverless/sam/)

![AWS Architecture](tomdrinkscoffee.png)

[tomdrinkscoffee draw.io diagram](tomdrinkscoffee.drawio)

### Rotating AppSync API Key when it expires

Set `CreateAPIKey: 0` in `coffee-app/amplify/backend/api/coffee/parameters.json`

https://github.com/aws-amplify/amplify-cli/issues/1450

### Extending expiry of AppSync API Key

Run script to reset expiry to 1 year in the future

```
bin/update-api-key.sh
```
