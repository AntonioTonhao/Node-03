import { Prisma, Gym } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from 'lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput){
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string){
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      }
    })

    return gym
  }

  async searchGymsQuery(query: string, page: number){
    const gyms = await prisma.gym.findMany({
      where: {
       title: query,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return gyms
  }

  async findManyNearby(params: FindManyNearbyParams){}
}
