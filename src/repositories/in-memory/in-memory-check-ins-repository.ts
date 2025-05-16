import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInSomeOnDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    )

    if (!checkInSomeOnDate) {
      return null
    }

    return checkInSomeOnDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
