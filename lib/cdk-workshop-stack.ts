import * as cdk from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { type Construct } from 'constructs'
import * as path from 'path'

import * as apiGateway from 'aws-cdk-lib/aws-apigateway'
import { HitCounter } from './hitcounter'

export class CdkWorkshopStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const hello = new NodejsFunction(this, 'HelloHandler', {
      entry: path.join(__dirname, '../lambda/hello.ts'),
      runtime: Runtime.NODEJS_16_X,
      handler: 'hello'
    })

    const helloHitCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    })

    new apiGateway.LambdaRestApi(this, 'HelloEndpoint', {
      handler: helloHitCounter.handler
    })
  }
}
