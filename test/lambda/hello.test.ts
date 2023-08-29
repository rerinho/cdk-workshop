import { hello } from '@lambda/hello'
import { type APIGatewayProxyEvent } from 'aws-lambda'

describe('Hello Lambda Function', () => {
  it('should return an object containing statusCode 200', async () => {
    const event: APIGatewayProxyEvent = {} as any

    const response = await hello(event)

    expect(response.statusCode).toBe(200)
  })
})
