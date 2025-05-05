import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UsersAlreadyExistsError } from './error/users-already-exists-error'

describe('Register Use Case', () => {
  it('should to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    const { user } = await sut.execute({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    const { user } = await sut.execute({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password: '123456',
    })

    const isPasswordHashedVerify = await compare('123456', user.password_hash)

    expect(isPasswordHashedVerify).toEqual(true)
  })
  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new RegisterUseCase(usersRepository)

    const email = 'jhondoe123@test.com'

    await sut.execute({
      email,
      name: 'jhondoe123',
      password: '123456',
    })

    expect(() =>
      sut.execute({
        email,
        name: 'jhondoe123',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError)
  })
})
