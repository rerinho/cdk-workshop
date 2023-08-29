import { CdkWorkshopStack } from '@lib/cdk-workshop-stack'
import * as cdk from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'

test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App()
  const stack = new CdkWorkshopStack(app, 'MyTestStack')

  const template = Template.fromStack(stack)

  template.hasResourceProperties('AWS::SQS::Queue', {
    VisibilityTimeout: 300
  })
  template.resourceCountIs('AWS::SNS::Topic', 1)
})
