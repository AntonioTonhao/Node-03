import { describe, expect, it } from 'vitest'
import { RegisterUseCases } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { EmailAlreadyExistsError } from './error/email-already-exists-error'

describe('Register Use Case', () => {
  // Teste para ver se vai da tudo certo no cadastro do usuario
  it('should be able to register', async () => {
    const testRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCases(testRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  // Teste de verificação se a senha foi criptografada com hash corretamente
  it('should hash user password upon registration', async () => {
    const testRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCases(testRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    })

    const isPasswordHashCorrect = await compare('123456', user.password_hash)

    expect(isPasswordHashCorrect).toBe(true)
  })
  // Teste para verificar se não é possivel cadastrar 2 usuarios com o mesmo email
  it('should not be able to register whit same email twice', async () => {
    const testRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCases(testRepository)

    const email = 'jhondoe@gmail.com'

    await registerUseCase.execute({
      name: 'Jon Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Jon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
