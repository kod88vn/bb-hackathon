# Deployment
This document describes how to deploy:

* AWS configuration
	* API Gateway
	* Lambda functions
	* IAM IDP providers & roles
	* S3 bucket for static website
* Auth0 configuration
	* Application
	* Social media integration
	* Rules
* Documentation
* Web app

## Generics
Export the following variable(s) to your shell for further use:
                
    account_id=$(aws iam get-user \
       --output text --query 'User.Arn' | \
       awk -F: '{print $5}')
       
    region_name=$(aws configure get region)

    lambda_execution_role_name=lambda-APIGatewayLambdaExecRole
    lambda_execution_access_policy_name=LogAndDynamoDBAccess
    log_group_name=/aws/lambda/TabsOverSpaces       

## AWS configuration
This section describes the steps to set-up the required AWS resources.

### Set permissions
IAM role that will be used by the Lambda function when it runs:

     lambda_execution_role_arn=$(aws iam create-role \
                                 --role-name "$lambda_execution_role_name" \
                                 --assume-role-policy-document file://src/main/resources/$function-trust-policy.json \
                                 --output text \
                                 --query 'Role.Arn'
     )
     
     echo lambda_execution_role_arn=$lambda_execution_role_arn
 
What the Lambda function is allowed to do/access. This is slightly tighter than the generic role policy created with 
the IAM console:

    aws iam put-role-policy \
      --role-name "$lambda_execution_role_name" \
      --policy-name "$lambda_execution_access_policy_name" \
      --policy-document file://src/main/resources/$function-role-policy.json

## Deploy function
Upload the Lambda function, specifying the IAM role it should use and other attributes:
    
    aws lambda create-function --function-name "$function" \
       --zip-file fileb://target/$jar_file_name-$version.jar \
       --role "$lambda_execution_role_arn" \
       --handler $handler \
       --runtime java8 \
       --description "Lambda function to test API gateway latency"


## Invoke Lambda function as test
Invoke the Lambda function, passing in the fake DBP event data:

    aws lambda invoke --function-name "$function" \
       --invocation-type RequestResponse \
       --payload fileb://src/test/resources/$function-data.json target/$function.out

Note the `StatusCode` returned -- should be **200**; view the data returned by the function: 

    cat target/$function.out
    
    >> {"greetings":"Hello Robin Huiser, you have $500.00 on account 12345678."}

# Configure API gateway
The Lambda function will be exposed through the API gateway.

## Create API
Create the `SessionAPIOperations` API for the AWS API gateway; save the `api_id` and `root_id` values for later use:

    apigateway_api_id=$(aws apigateway create-rest-api \
                        --name ${function}Operations \
                        --output text \
                        --query 'id')
       
    apigateway_root_id=$(aws apigateway get-resources \
                         --rest-api-id $apigateway_api_id \
                         --output text \
                         --query 'items[0].id')
    
    echo apigateway_api_id=$apigateway_api_id
    echo apigateway_root_id=$apigateway_root_id

## Create resources
Create the `/perftest` resource:

    apigateway_resource_id=$(aws apigateway create-resource \
                             --rest-api-id $apigateway_api_id \
                             --parent-id $apigateway_root_id \
                             --path-part perftest \
                             --output text \
                             --query 'id')
    
    echo apigateway_resource_id=$apigateway_resource_id
    
    
## Create methods
The API will support the `POST` method; we specify `NONE` for the --authorization-type parameter, which means 
that unauthenticated requests for this method are supported (to keep in sync with current security model applied
to DBP).

    aws apigateway put-method \
       --rest-api-id $apigateway_api_id \
       --resource-id $apigateway_resource_id \
       --http-method POST \
       --authorization-type NONE

## Connect Lambda function
First, we need the Lambda function `Arn`, let's save this to a variable:

    lambda_function_arn=$(aws lambda get-function \
                          --function-name "$function" \
                          --output text \
                          --query 'Configuration.FunctionArn')
        
     echo lambda_function_arn=$lambda_function_arn

Run the following command to set the Lambda function as the integration point for the POST method:

    aws apigateway put-integration \
       --rest-api-id  $apigateway_api_id \
       --resource-id $apigateway_resource_id \
       --http-method POST \
       --type AWS \
       --integration-http-method POST \
       --uri arn:aws:apigateway:${region_name}:lambda:path/2015-03-31/functions/${lambda_function_arn}/invocations

## Set content-type request/response
Run the following command to set the POST method response to JSON. This is the response type that 
the SessionAPI method returns:

    aws apigateway put-method-response \
       --rest-api-id $apigateway_api_id \
       --resource-id $apigateway_resource_id \
       --http-method POST \
       --status-code 200 \
       --response-models "{\"application/json\": \"Empty\"}"    

Run the following command to set the POST method integration response to JSON. This is the response type that 
Lambda function returns.

    aws apigateway put-integration-response \
       --rest-api-id $apigateway_api_id \
       --resource-id $apigateway_resource_id \
       --http-method POST \
       --status-code 200 \
       --response-templates "{\"application/json\": \"\"}"

## Deploy the API
In this step, the API is deployed to a stage called `uat`.

    apigateway_deployment_id=$(aws apigateway create-deployment \
                               --rest-api-id $apigateway_api_id \
                               --stage-name uat \
                               --output text \
                               --query 'id')
     
     echo apigateway_deployment_id=$apigateway_deployment_id
     
## Grant permissions for uat (not published)
Add permissions so that Amazon API Gateway can invoke the Lambda function when sending HTTPS request to the POST method:

    aws lambda add-permission \
       --function-name $function \
       --statement-id apigateway-test-$function-internal \
       --action lambda:InvokeFunction \
       --principal apigateway.amazonaws.com \
       --source-arn "arn:aws:execute-api:${region_name}:${account_id}:${apigateway_api_id}/*/POST/perftest"

You must grant this permission to enable testing (if you go to the Amazon API Gateway and choose **Test** to 
test the API method, you need this permission). Note the `--source-arn` specifies a wildcard character (*) as the 
stage value (indicates testing only). This allows you to test without deploying the API.

### Test (via API Gateway)
Run the `test-invoke-method` Amazon API Gateway command to send an HTTPS POST method request to the 
resource (perftest) endpoint with the earlier used JSON in the request body.

    aws apigateway test-invoke-method \
    --rest-api-id $apigateway_api_id \
    --resource-id $apigateway_resource_id \
    --http-method POST \
    --path-with-query-string "" \
    --body file://src/test/resources/$function-data.json

## Grant permissions for uat (published)
Now, run the `add-permission` same command again, but this time you grant to your deployed API permissions to invoke the Lambda function:

    aws lambda add-permission \
       --function-name $function \
       --statement-id apigateway-test-$function-external \
       --action lambda:InvokeFunction \
       --principal apigateway.amazonaws.com \
       --source-arn "arn:aws:execute-api:${region_name}:${account_id}:${apigateway_api_id}/uat/POST/perftest"

### Test (external)
Now, use some decent commandline tooling like `curl`:

    curl -X POST --data "@src/test/resources/$function-data.json" \
       https://${apigateway_api_id}.execute-api.${region_name}.amazonaws.com/uat/perftest

Some performance stats:

    # Single call; split over several stats
    curl -w "@src/test/resources/curl-timing-format.template" \
       -o /dev/null -s \
       -X POST --data "@src/test/resources/$function-data.json" \
       https://${apigateway_api_id}.execute-api.${region_name}.amazonaws.com/uat/perftest
    
    for i in {1..50000};do 
       curl -s -w "%{time_total}\n" -o /dev/null \
          -X POST --data "@src/test/resources/$function-data.json" \
          https://${apigateway_api_id}.execute-api.${region_name}.amazonaws.com/uat/perftest
     done

Now, check the CloudWatch Metrics under API Gateway and note the delay.

# Cleanup
If you are done with the PoC, you can delete the created resources:
       
    aws apigateway delete-stage \
       --rest-api-id $apigateway_api_id \
       --stage-name uat
    
    aws apigateway delete-method \
       --rest-api-id $apigateway_api_id \
       --resource-id $apigateway_resource_id \
       --http-method POST
    
    aws apigateway delete-resource \
       --rest-api-id $apigateway_api_id \
       --resource-id $apigateway_resource_id
       
    aws apigateway delete-rest-api \
       --rest-api-id $apigateway_api_id
    
    aws lambda delete-function \
      --function-name "$function"
    
    aws iam delete-role-policy \
      --role-name "$lambda_execution_role_name" \
      --policy-name "$lambda_execution_access_policy_name"
    
    aws iam delete-role \
      --role-name "$lambda_execution_role_name"
    
    log_stream_names=$(aws logs describe-log-streams \
      --log-group-name "$log_group_name" \
      --output text \
      --query 'logStreams[*].logStreamName') &&
    for log_stream_name in $log_stream_names; do
      echo "deleting log-stream $log_stream_name"
      aws logs delete-log-stream \
        --log-group-name "$log_group_name" \
        --log-stream-name "$log_stream_name"
    done
    
    aws logs delete-log-group \
      --log-group-name "$log_group_name"