import { describe, expect, it } from 'vitest'
import { RegisterUseCases } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('Tentar cadastrar um usuario', async () => {
    const registerUseCase = new RegisterUseCases({
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Jon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    })

    const isPasswordHashCorrect = await compare('123456', user.password_hash)

    expect(isPasswordHashCorrect).toBe(true)
  })
})
