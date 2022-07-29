'use-strict'

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
AWS.config.update({ region: 'me-south-1' });

const groupTable = process.env.GROUPS_TABLE 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log("processing event...", event)    
    
    // const itemId = uuid.v4();
    const result = await docClient.scan({
        TableName: groupTable
    }).promise()

    const items = result.Items

    console.log ("get items from dynamoDB")

    return {
        statusCode: 201,
        headers: {
           'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify({
            items
        })
        
    }
};