import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { CredentialsError } from '../error/credentions-error';
import { AutenticateUseCase } from './autentication';

let usersRepository: InMemoryUsersRepository;
let sut: AutenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AutenticateUseCase(usersRepository);
  });

  it('should to autenticate', async () => {
    await usersRepository.create({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'jhondoe123@test.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'jhondoe@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(CredentialsError);
  });
  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      email: 'jhondoe123@test.com',
      name: 'jhondoe123',
      password_hash: await hash('123456', 6),
    });

    expect(() =>
      sut.execute({
        email: 'jhondoe123@test.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(CredentialsError);
  });
});
