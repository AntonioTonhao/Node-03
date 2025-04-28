import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './error/email-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCasesParams {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseRequest {
  user: User
}

export class RegisterUseCases {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCasesParams): Promise<RegisterUseCaseRequest> {
    const password_hash = await hash(password, 6)

    const checkUniqueEmail = await this.usersRepository.findByEmail(email)

    if (!checkUniqueEmail) {
      throw new EmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}
