import { HitCounter } from '@lib/constructs/hitcounter'
import { Match, Template } from 'aws-cdk-lib/assertions'
import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb'

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

  it('should grant Read/Write access to DynamoDb::Table for HitCounter LambdaFunction', () => {
    const template = makeStackTemplate()

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: Match.arrayWith(['dynamodb:Query', 'dynamodb:GetItem', 'dynamodb:PutItem']),
            Effect: 'Allow'
          })
        ])
      },
      PolicyName: Match.stringLikeRegexp('HitCounter')
    })
  })

  it('should grant downstream LambdaFunction invoke permission to HitCounter LambdaFunction', () => {
    const template = makeStackTemplate()

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'lambda:InvokeFunction',
            Effect: 'Allow'
          })
        ])
      },
      PolicyName: Match.stringLikeRegexp('HitCounter')
    })
  })

  it('should expose the created instance of DynamoDB::Table', () => {
    const { hitCounter } = makeHitCounterStack()

    expect(hitCounter.table).toBeInstanceOf(dynamoDb.Table)
  })

  test('should create the DynamoDB::Table with encryption', () => {
    const template = makeStackTemplate()

    template.hasResourceProperties('AWS::DynamoDB::Table', {
      SSESpecification: {
        SSEEnabled: true
      }
    })
  })
})

interface MakeHitCounterStackTypes {
  hitCounter: HitCounter
  stack: cdk.Stack
}

const makeHitCounterStack = (): MakeHitCounterStackTypes => {
  const stack = new cdk.Stack()
  const lambda = makeFakeLambda(stack)
  const hitCounter = new HitCounter(stack, 'HitCounter', {
    downstream: lambda
  })

  return { stack, hitCounter }
}

const makeFakeLambda = (stack: cdk.Stack): lambda.Function => {
  const fakeLambda = new lambda.Function(stack, 'FakeLambda', {
    code: lambda.Code.fromInline('exports.handler = async function (event, context) {}'),
    handler: 'handler',
    runtime: lambda.Runtime.NODEJS_16_X
  })
  return fakeLambda
}

const makeStackTemplate = (): Template => {
  const { stack } = makeHitCounterStack()
  return Template.fromStack(stack)
}
