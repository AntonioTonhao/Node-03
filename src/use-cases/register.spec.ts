import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UsersAlreadyExistsError } from './error/users-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should to register', async () => {
    const { user } = await sut.execute({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password: '123456',
    })

    const isPasswordHashedVerify = await compare('123456', user.password_hash)

    expect(isPasswordHashedVerify).toEqual(true)
  })
  it('should not be able to register with same email twice', async () => {
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
