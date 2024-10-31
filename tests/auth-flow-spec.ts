import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'

test('Incorrect login and password', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithICorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })

  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT login: returns 405 status code with incorrect HTTTP method', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()

  const response = await request.put(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })

  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  const responseBody = await response.text()
  console.log(responseBody)
})

test('Correct login and password', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })

  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  console.log(await response.text())
})

test('POST login: returns 200 status code with valid JWT token', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()

  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: loginDto,
  })

  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.text()
  console.log(responseBody)
  const jwtPattern = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  expect.soft(responseBody).toMatch(jwtPattern)
})
