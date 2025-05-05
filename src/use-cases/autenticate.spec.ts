import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it } from 'vitest'

import { hash } from 'bcryptjs'
import { CredentialsError } from './error/credentions-error'
import { AutenticateUseCase } from './autentication'

describe('Authenticate Use Case', () => {
  it('should to autenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AutenticateUseCase(usersRepository)

    await usersRepository.create({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe123@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AutenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'jhondoe@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(CredentialsError)
  })
  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AutenticateUseCase(usersRepository)

    await usersRepository.create({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'jhondoe123@test.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(CredentialsError)
  })
})
