import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '@/repositories/check-ins-repository';
import dayjs from 'dayjs';
import { ResourceNotFoundError } from '../error/resource-not-found-error';
import { LateCreateCheckInAfter20Minute } from '../error/late-create-check-in-after-20-minute';

interface ValidadeCheckInsCasesRequest {
  checkInId: string;
}

interface ValidadeCheckInsCaseResponse {
  checkIn: CheckIn;
}

export class ValidadeCheckInsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidadeCheckInsCasesRequest): Promise<ValidadeCheckInsCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinuteOfValidatedCheckIn = dayjs(new Date()).diff(
      checkIn.created_at,
      'minute',
    );

    if (distanceInMinuteOfValidatedCheckIn > 20) {
      throw new LateCreateCheckInAfter20Minute();
    }

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return { checkIn };
  }
}
