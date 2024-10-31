import { expect, test } from '@playwright/test'
import { LoanDto } from './dto/loan-dto'
import { StatusCodes } from 'http-status-codes'

test.describe('Loan tests', () => {
  test('POST loan: returns 200 status code with law risk', async ({ request }) => {
    const riskDto = LoanDto.calcPositiveRiskScore()
    riskDto.loanPeriod = 12
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskLevel).toBe('Low Risk')
  })

  test('POST loan: returns 200 status code with medium risk', async ({ request }) => {
    const riskDto = LoanDto.calcPositiveRiskScore()

    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: { ...riskDto, loanPeriod: 9 },
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  })

  test('POST loan: returns 200 status code with high risk', async ({ request }) => {
    const riskDto = LoanDto.calcPositiveRiskScore()
    riskDto.loanPeriod = 3
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskLevel).toBe('High Risk')
  })
  test('POST loan: returns 200 status code with negative decision', async ({ request }) => {
    const riskDto = LoanDto.calcNegativeRiskScore()
    riskDto.income = 1100
    riskDto.loanPeriod = 34
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.riskDecision).toBe('negative')
  })

  test('POST loan: returns 400 status code with negative debt ', async ({ request }) => {
    const riskDto = LoanDto.calcNegativeRiskScore()
    riskDto.debt = -20
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: riskDto,
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
})
