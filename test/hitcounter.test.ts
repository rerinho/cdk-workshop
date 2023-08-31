import { HitCounter } from '@lib/hitcounter'
import { Template } from 'aws-cdk-lib/assertions'
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'

describe('HitCounter', () => {
  it('should initialize a DyanmoDB::Table', () => {
    const stack = new cdk.Stack()
    const fakeLambda = new lambda.Function(stack, 'FakeLambda', {
      code: lambda.Code.fromInline('exports.handler = async function(event, context) {}'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_16_X
    })
    new HitCounter(stack, 'HitCounter', {
      downstream: fakeLambda
    })
    const template = Template.fromStack(stack)

    template.resourceCountIs('AWS::DynamoDB::Table', 1)
  })

  it('should iniatilize a HitCounter LambdaFunction with correct values', () => {
    const stack = new cdk.Stack()
    const fakeLambda = new lambda.Function(stack, 'FakeLambda', {
      code: lambda.Code.fromInline('exports.handler = async function (event, context) {}'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_16_X
    })
    new HitCounter(stack, 'HitCounter', {
      downstream: fakeLambda
    })
    const template = Template.fromStack(stack)

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.hitCounter',
      Environment: {
        Variables: {
          DOWNSTREAM_FUNCTION_NAME: {
            Ref: 'FakeLambda85E42A7F'
          },
          HITS_TABLE_NAME: {
            Ref: 'HitCounterHits079767E5'
          }
        }
      }
    })
  })
})
