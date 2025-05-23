import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-cordinates'
import { CheckInTwiceInTheSameDay } from './error/check-in-twice-in-the-same-day'
import { MaxDistanceError } from './error/max-distance-error'

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
    userLatitude,
    userLongitude,
  }: CheckInsCasesRequest): Promise<CheckInsCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError()
    }

    const checkInOnSomeDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSomeDate) {
      throw new CheckInTwiceInTheSameDay()
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
