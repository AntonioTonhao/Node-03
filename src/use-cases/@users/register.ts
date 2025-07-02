import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UsersAlreadyExistsError } from '../error/users-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUseCasesParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseRequest {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCasesParams): Promise<RegisterUseCaseRequest> {
    const password_hash = await hash(password, 6);

    const checkUniqueEmail = await this.usersRepository.findByEmail(email);

    if (checkUniqueEmail) {
      throw new UsersAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
