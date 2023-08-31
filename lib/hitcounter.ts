import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as path from 'path'

export interface HitCounterProps {
  downstream: lambda.IFunction
}

export class HitCounter extends Construct {
  public readonly handler: lambda.Function

  constructor (scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id)

    const table = new dynamoDb.Table(this, 'Hits', {
      partitionKey: { name: 'path', type: dynamoDb.AttributeType.STRING }
    })

    this.handler = new NodejsFunction(this, 'HitCounterHandler', {
      entry: path.join(__dirname, '../lambda/hitcounter.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'hitCounter',
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName
      }
    })

    table.grantReadWriteData(this.handler)
  }
}
