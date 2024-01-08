import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { Injectable } from '@nestjs/common'

interface AnswerQuestionServiceRequest {
  authorId: string
  questionId: string
  attachmentIds: string[]
  content: string
}

type AnswerQuestionServiceResponse = Either<
  null,
  {
    answer: Answer
  }
>

@Injectable()
export class AnswerQuestionService {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentIds,
  }: AnswerQuestionServiceRequest): Promise<AnswerQuestionServiceResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
