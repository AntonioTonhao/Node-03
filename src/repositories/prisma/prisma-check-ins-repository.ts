import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  findManyUserId(userId: string, page: number): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  findUserMetrics(userId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  save(checkIn: CheckIn): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }
}
