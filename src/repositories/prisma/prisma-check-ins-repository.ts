import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'
import { prisma } from 'lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
     const startOfTheDay = dayjs(date).startOf('date')
     const endOfTheDay = dayjs(date).endOf('date')

     const checkIn = await prisma.checkIn.findFirst({
      where:{
        user_id: userId,
        created_at:{
          gte : startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
     })

     return checkIn
  }

  async findManyUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where:{
        user_id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return checkIns
  }

  async findById(id: string){
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }

  async findUserMetrics(userId: string){
    const countCheckIn = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return countCheckIn
  }

  async save(data: CheckIn){
    const checkIn = await prisma.checkIn.update({
      where: {
        id : data.id,
      },
      data,
    })

    return checkIn
  }
}
