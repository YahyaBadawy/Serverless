'use-strict'

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'

const docClient = new AWS.DynamoDB.DocumentClient()
AWS.config.update({ region: 'me-south-1' });

const groupTable = process.env.GROUPS_TABLE 

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log("processing event...", event)
    const paresedBody = JSON.parse(event.body)
       
    const itemId = uuid.v4();

    const item = {
        id: itemId,
        name: paresedBody.name,
        description: paresedBody.description
    }

    console.log("Object item constructed!")

    await docClient.put({
        TableName: groupTable,
        Item: item
    }).promise()

    console.log ("item has been put to dynamoDB")

    return {
        statusCode: 201,
        headers: {
           'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify({
            item
        })
        
    }
};