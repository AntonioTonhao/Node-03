import { Prisma, Gym } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }

  searchGymsQuery(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }
}
