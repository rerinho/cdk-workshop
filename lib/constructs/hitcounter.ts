import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as path from 'path'

export interface HitCounterProps {
  downstream: lambda.IFunction
}

export class HitCounter extends Construct {
  public handler: lambda.Function
  public table: dynamoDb.Table

  constructor (scope: Construct, id: string, private readonly props: HitCounterProps) {
    super(scope, id)
    this.table = this.initializeTable()
    this.handler = this.initializeLambda()
    this.grantPermissions()
  }

  private initializeTable (): dynamoDb.Table {
    return new dynamoDb.Table(this, 'Hits', {
      partitionKey: { name: 'path', type: dynamoDb.AttributeType.STRING },
      encryption: dynamoDb.TableEncryption.AWS_MANAGED
    })
  }

  private initializeLambda (): lambda.Function {
    return new NodejsFunction(this, 'HitCounterHandler', {
      entry: path.join(__dirname, '../../lambda/hitcounter.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'hitCounter',
      environment: {
        DOWNSTREAM_FUNCTION_NAME: this.props.downstream.functionName,
        HITS_TABLE_NAME: this.table.tableName
      }
    })
  }

  private grantPermissions (): void {
    this.table.grantReadWriteData(this.handler)
    this.props.downstream.grantInvoke(this.handler)
  }
}
