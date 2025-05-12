import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AutenticateUseCase } from '../autentication'

export default function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCases = new AutenticateUseCase(usersRepository)

  return authenticateUseCases
}
