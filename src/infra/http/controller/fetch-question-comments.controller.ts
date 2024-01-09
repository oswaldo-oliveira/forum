import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchQuestionCommentsService } from '@/domain/forum/application/services/fetch-question-comments'
import { CommentPresenter } from '../presenters/comment-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryValidationSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(
    private fetchQuestionCommentsService: FetchQuestionCommentsService,
  ) {}

  @Get()
  async handler(
    @Query('page', queryValidationPipe) page: PageQueryValidationSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionCommentsService.execute({
      questionId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const comments = result.value.questionComments

    return { comments: comments.map(CommentPresenter.toHTTP) }
  }
}
