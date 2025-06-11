import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInsUseCase } from '../check-ins'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'

export default function makeAuthenticateUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymInsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInsUseCase(checkInsRepository,gymInsRepository)

  return checkInUseCase
}
