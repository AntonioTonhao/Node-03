import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface CheckInsCasesRequest {
  gymId: string
  userId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInsCaseResponse {
  checkIn: CheckIn
}

export class CheckInsUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
  }: CheckInsCasesRequest): Promise<CheckInsCaseResponse> {
    const checkGymExists = await this.gymsRepository.findById(gymId)

    if (!checkGymExists) {
      throw new ResourceNotFoundError()
    }

    const checkInOnSomeDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSomeDate) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
