import { hello } from '@lambda/hello'
import { type APIGatewayProxyEvent } from 'aws-lambda'

describe('Hello Lambda Function', () => {
  it('should return an object containing statusCode 200', async () => {
    const event: APIGatewayProxyEvent = {} as any

    const response = await hello(event)

    expect(response.statusCode).toBe(200)
  })

  it('should return an object containing a body with the entered path', async () => {
    const event: APIGatewayProxyEvent = {
      path: 'any_path'
    } as any

    const response = await hello(event)

    expect(response.body).toContain('any_path')
  })
})
