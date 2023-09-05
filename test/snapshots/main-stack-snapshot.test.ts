import * as cdk from 'aws-cdk-lib'
import { MainStack } from '@lib/stacks/main-stack'
import { Template } from 'aws-cdk-lib/assertions'

test('should match the snapshot', () => {
  const app = new cdk.App()
  const stack = new MainStack(app, 'MainStack')
  const template = Template.fromStack(stack)

  expect(template.toJSON()).toMatchSnapshot()
})
