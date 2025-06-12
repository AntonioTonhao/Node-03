import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export default function makeCreateGymUseCase() {
  const gymInsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUsesCase = new FetchNearbyGymsUseCase(gymInsRepository)

  return fetchNearbyGymsUsesCase
}
