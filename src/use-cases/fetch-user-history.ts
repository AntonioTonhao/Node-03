import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistory {
  constructor(private checkInRepository: CheckInRepository,) {}

  async execute({
    page,
    userId
  }: FetchUserCheckInHistoryRequest): Promise<FetchUserCheckInHistoryResponse> {
    const checkIns = await this.checkInRepository.findManyUserId(userId,page)

    return { checkIns }
  }
}
