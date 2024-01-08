import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Injectable } from '@nestjs/common'

interface FetchQuestionAnswersServiceRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersServiceResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

@Injectable()
export class FetchQuestionAnswersService {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersServiceRequest): Promise<FetchQuestionAnswersServiceResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
