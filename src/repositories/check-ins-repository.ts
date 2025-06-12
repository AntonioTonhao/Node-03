import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyUserId(userId: string, page: number): Promise<CheckIn[]>
  findById(id: string): Promise<CheckIn | null>
  findUserMetrics(userId: string): Promise<number>
  save(checkIn: CheckIn): Promise<CheckIn>
}
