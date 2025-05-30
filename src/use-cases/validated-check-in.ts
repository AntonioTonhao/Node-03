import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface ValidadeCheckInsCasesRequest {
  checkInId: string
}

interface ValidadeCheckInsCaseResponse {
  checkIn: CheckIn
}

export class ValidadeCheckInsUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
  ) {}

  async execute({
    checkInId,
  }: ValidadeCheckInsCasesRequest): Promise<ValidadeCheckInsCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
