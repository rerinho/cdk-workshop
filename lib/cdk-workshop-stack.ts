import * as path from 'path'
import * as cdk from 'aws-cdk-lib'
import * as apiGateway from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { type Construct } from 'constructs'
import { HitCounter } from './hitcounter'
import { TableViewer } from 'cdk-dynamo-table-viewer'
import { type Table } from 'aws-cdk-lib/aws-dynamodb'

export class CdkWorkshopStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    const helloLambda = this.createHelloLambda()
    const helloHitCounter = this.createHitCounterFor(helloLambda)
    this.initializeRestAPIFor(helloHitCounter.handler)
    this.initializeTableViewerFor(helloHitCounter.table)
  }

  private createHelloLambda (): lambda.Function {
    return new NodejsFunction(this, 'HelloHandler', {
      entry: path.join(__dirname, '../lambda/hello.ts'),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'hello'
    })
  }

  private createHitCounterFor (lambda: lambda.Function): HitCounter {
    return new HitCounter(this, 'HelloHitCounter', {
      downstream: lambda
    })
  }

  private initializeRestAPIFor (lambda: lambda.Function): void {
    new apiGateway.LambdaRestApi(this, 'HelloEndpoint', {
      handler: lambda
    })
  }

  private initializeTableViewerFor (table: Table): void {
    new TableViewer(this, 'ViewHitCounter', {
      table,
      title: 'Hello Hits',
      sortBy: '-hits'
    })
  }
}
