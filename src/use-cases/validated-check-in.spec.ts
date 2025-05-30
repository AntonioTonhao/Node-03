import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { ValidadeCheckInsUseCase } from './validated-check-in'
import { ResourceNotFoundError } from './error/resource-not-found-error'


let checkInRepository: InMemoryCheckInRepository
let sut: ValidadeCheckInsUseCase

describe('Validated Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidadeCheckInsUseCase(checkInRepository)

    // vi.useFakeTimers()

  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should to create validated check in', async () => {
    const createdCheckIn = await checkInRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
    })
    
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))

  })

   it('not should to create validated check in', async () => {
    
    await expect(() => 
    sut.execute({
    checkInId: 'inextant-check-in-Id'
    })
    ).rejects.instanceOf(ResourceNotFoundError)

  })
 
})
