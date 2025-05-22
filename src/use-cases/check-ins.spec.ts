import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './check-ins'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInTwiceInTheSameDay } from './error/check-in-twice-in-the-same-day'
import { MaxDistanceError } from './error/max-distance-error'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInsUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInsUseCase(checkInRepository, gymsRepository)

    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'Gym Test',
      description: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      title: 'Gym 01',
      phone: '',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should to create check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 3, 0, 0))

    await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'Gym Test',
        userId: 'User Test',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.instanceOf(CheckInTwiceInTheSameDay)
  })
  it('should be able to check in twice in the different days ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 3, 0, 0))

    await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 3, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to create check in on distance the gym', async () => {
    gymsRepository.items.push({
      id: 'Gym Test 2',
      description: '',
      latitude: new Decimal(-20.2520057),
      longitude: new Decimal(-42.0205247),
      title: 'Gym 02',
      phone: '',
    })
    await expect(() =>
      sut.execute({
        gymId: 'Gym Test',
        userId: 'User Test',
        userLatitude: -20.2430421,
        userLongitude: -41.9991461,
      }),
    ).rejects.instanceOf(MaxDistanceError)
  })
})
