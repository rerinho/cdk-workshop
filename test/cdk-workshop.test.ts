import { CdkWorkshopStack } from '@lib/cdk-workshop-stack'
import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { Runtime } from 'aws-cdk-lib/aws-lambda'

describe('CdkWorkshopStack', () => {
  test('should initialize Hello Lambda Function with correct properties', () => {
    const app = new cdk.App()
    const stack = new CdkWorkshopStack(app, 'CdkWorkshopStack')
    const template = Template.fromStack(stack)

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.hello',
      Runtime: Runtime.NODEJS_16_X.name
    })
  })
})
