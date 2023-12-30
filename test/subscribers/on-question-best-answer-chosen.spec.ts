import {
  SendNotificationService,
  SendNotificationServiceRequest,
  SendNotificationServiceResponse,
} from '@/domain/notification/application/services/send-notification'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { makeAnswer } from 'test/forum/factories/make-answer'
import { makeQuestion } from 'test/forum/factories/make-question'
import { InMemoryAnswerAttachmentsRepository } from 'test/forum/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/forum/repositories/in-memory-answers-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/forum/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/forum/repositories/in-memory-questions-repository'
import { InMemoryNotificationsRepository } from 'test/notification/repositories/in-memory-notification-repository'
import { waitFor } from 'test/utils/wait-for'
import { MockInstance } from 'vitest'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationService

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationServiceRequest],
  Promise<SendNotificationServiceResponse>
>

describe('On question best answer chosen', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationService(inMemoryNotificationsRepository)

    sendNotificationExecuteSpy = vi.spyOn(sut, 'execute')

    new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sut)
  })

  it('should send a notification when question has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
