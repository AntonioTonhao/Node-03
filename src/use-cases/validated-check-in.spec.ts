import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidadeCheckInsUseCase } from './validated-check-in'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { LateCreateCheckInAfter20Minute } from './error/late-create-check-in-after-20-minute'


let checkInRepository: InMemoryCheckInRepository
let sut: ValidadeCheckInsUseCase

describe('Validated Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidadeCheckInsUseCase(checkInRepository)

    vi.useFakeTimers()

  })

  afterEach(() => {
    vi.useRealTimers()
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
 
  it('not should to create validated check in 20 minute late', async () => {
    vi.setSystemTime(new Date(2003, 0, 1, 15, 40)) 
    
    const createdCheckIn = await checkInRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
    }) 
    
    const minute21 = 1000 * 60 * 21

    vi.advanceTimersByTime(minute21)

    await expect(() => 
      sut.execute({
        checkInId: createdCheckIn.id
      })
    ).rejects.instanceOf(LateCreateCheckInAfter20Minute)

  })
})
