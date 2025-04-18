import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCasesParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCases {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCasesParams) {
    const password_hash = await hash(password, 6)

    const checkUniqueEmail = await this.usersRepository.findByEmail(email)

    if (checkUniqueEmail) {
      throw new Error('Email already exists!')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}
