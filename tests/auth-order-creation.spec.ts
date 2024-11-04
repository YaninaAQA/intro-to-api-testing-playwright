import { expect, test } from '@playwright/test'
import { ApiClient } from './api/api-client'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test('Authorize and Order Creation With API client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  expect.soft(orderId).toBeDefined()
})

test('Authorize and Get Order ID (without api client)', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const auth = await request.post(`${serviceURL}${loginPath}`, { data: loginDto })
  expect.soft(auth.status()).toBe(StatusCodes.OK)
  const token = await auth.text()

  const orderDto = OrderDto.createOrderWithUndefinedOrderId()
  const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: orderDto,
    headers: { Authorization: `Bearer ${token}` },
  })
  expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
  const orderId = (await orderResponse.json()).id

  const getOrderId = await request.get(`${serviceURL}${orderPath}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  expect.soft(getOrderId.status()).toBe(StatusCodes.OK)
})

test('Authorize and delete order ID (without API client)', async ({ request }) => {
  const loginDto = LoginDto.createLoginWithCorrectCredentials()
  const auth = await request.post(`${serviceURL}${loginPath}`, { data: loginDto })
  expect.soft(auth.status()).toBe(StatusCodes.OK)
  const token = await auth.text()
  const orderDto = OrderDto.createOrderWithUndefinedOrderId()

  const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: orderDto,
    headers: { Authorization: `Bearer ${token}` },
  })
  expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
  const orderId = (await orderResponse.json()).id
  const deleteOrder = await request.delete(`${serviceURL}${orderPath}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  expect(deleteOrder.status()).toBe(StatusCodes.OK)
})

test('Authorize and Get Order ID (with api client)', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  expect.soft(orderId).toBeDefined()

  await apiClient.getOrderId(orderId)
  expect.soft(orderId).toBeDefined()
})

test('Authorize and Delete Order ID (with api client)', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  expect.soft(orderId).toBeDefined()

  await apiClient.deleteOrderId(orderId)
  expect.soft(orderId).toBeDefined()
})
