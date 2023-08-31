import { Construct } from 'constructs'
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb'
import type * as lambda from 'aws-cdk-lib/aws-lambda'

export interface HitCounterProps {
  downstream: lambda.IFunction
}

export class HitCounter extends Construct {
  public readonly handler: lambda.Function

  constructor (scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id)

    new dynamoDb.Table(this, 'Hits', {
      partitionKey: { name: 'path', type: dynamoDb.AttributeType.STRING }
    })
  }
}
