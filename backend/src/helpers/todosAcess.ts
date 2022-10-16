import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

const TODOS_TABLE = process.env.TODOS_TABLE;
const docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient()
export const getTodos = async (userId: string): Promise<TodoItem[]> => {
    logger.info(`Get all todo items for user ${userId}`)
    const results = await docClient.query({
        TableName: TODOS_TABLE,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
    }).promise();
    return results.Items as TodoItem[];
}