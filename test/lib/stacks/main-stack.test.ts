import { MainStack } from '@lib/stacks/main-stack'
import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { Runtime } from 'aws-cdk-lib/aws-lambda'

describe('Main Stack', () => {
  it('should initialize Hello LambdaFunction with correct properties', () => {
    const template = makeStackTemplate()

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.hello',
      Runtime: Runtime.NODEJS_16_X.name
    })
  })

  it('should initialize an APIGateway::RestApi resource for the Hello LambdaFunction', () => {
    const template = makeStackTemplate()

    template.hasResourceProperties('AWS::ApiGateway::RestApi', {
      Name: 'HelloEndpoint'
    })
  })

  it('should initialize HitsCounter LambdaFunction', () => {
    const template = makeStackTemplate()

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.hitCounter'
    })
  })

  it('should initialize a TableViewer for HitsCounter Table with correct values', () => {
    const template = makeStackTemplate()

    template.hasResourceProperties('AWS::Lambda::Function', {
      Environment: {
        Variables: {
          TABLE_NAME: {
            Ref: 'HelloHitCounterHits7AAEBF80'
          },
          SORT_BY: '-hits'
        }
      }
    })
  })
})

const makeStackTemplate = (): Template => {
  const app = new cdk.App()
  const stack = new MainStack(app, 'CdkWorkshopStack')
  return Template.fromStack(stack)
}
