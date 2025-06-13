import { FetchUserCheckInHistory } from '../fetch-user-check-in-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export default function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInHistory(checkInsRepository)

  return useCase
}
