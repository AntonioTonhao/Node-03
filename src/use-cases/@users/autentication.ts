import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { CredentialsError } from '../error/credentions-error';
import { compare } from 'bcryptjs';

interface AutenticationRequest {
  email: string;
  password: string;
}

interface AutenticationResponse {
  user: User;
}

export class AutenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AutenticationRequest): Promise<AutenticationResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new CredentialsError();
    }

    const doestPasswordMatches = await compare(password, user.password_hash);

    if (!doestPasswordMatches) {
      throw new CredentialsError();
    }

    return { user };
  }
}
