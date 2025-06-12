import { FetchUserCheckInHistory } from '../fetch-user-check-in-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export default function makeAuthenticateUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const authenticateUseCases = new FetchUserCheckInHistory(checkInsRepository)

  return authenticateUseCases
}
