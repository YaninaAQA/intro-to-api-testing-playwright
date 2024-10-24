export class LoginDto {
  username: string
  password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createLoginWithCorrectCredentials(): LoginDto {
    return new LoginDto(
      // eslint-disable-next-line no-undef
      process.env.USER || '',
      // eslint-disable-next-line no-undef
      process.env.PASSWORD || '',
    )
  }

  static createLoginWithICorrectCredentials(): LoginDto {
    return new LoginDto('yana', 'password')
  }
}
