import { HitCounter } from '@lib/hitcounter'
import { Template } from 'aws-cdk-lib/assertions'
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'

describe('HitCounter', () => {
  it('should initialize a DyanmoDB::Table', () => {
    const template = makeStackTemplate()

    template.resourceCountIs('AWS::DynamoDB::Table', 1)
  })

  it('should iniatilize a HitCounter LambdaFunction with correct values', () => {
    const template = makeStackTemplate()
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

const makeFakeLambda = (stack: cdk.Stack): lambda.Function => {
  const fakeLambda = new lambda.Function(stack, 'FakeLambda', {
    code: lambda.Code.fromInline('exports.handler = async function (event, context) {}'),
    handler: 'handler',
    runtime: lambda.Runtime.NODEJS_16_X
  })
  return fakeLambda
}

const makeStackTemplate = (): Template => {
  const stack = new cdk.Stack()
  const lambda = makeFakeLambda(stack)
  new HitCounter(stack, 'HitCounter', {
    downstream: lambda
  })
  return Template.fromStack(stack)
}
