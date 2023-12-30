import { SendNotificationService } from '@/domain/notification/application/services/send-notification'
import { InMemoryNotificationsRepository } from '../repositories/in-memory-notification-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationService

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationService(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification.', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
