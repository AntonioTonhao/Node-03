import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'

interface CheckInsCasesRequest {
  gymId: string
  userId: string
}

interface CheckInsCaseResponse {
  checkIn: CheckIn
}

export class CheckInsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInsCasesRequest): Promise<CheckInsCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
