import { Module } from '@nestjs/common'
import { CreateAccountController } from './controller/create-account.controller'
import { AuthenticateController } from './controller/authenticate.controller'
import { CreateQuestionController } from './controller/create-question.controller'
import { FetchRecentQuestionsController } from './controller/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionService } from '@/domain/forum/application/services/create-question'
import { FetchRecentQuestionsService } from '@/domain/forum/application/services/fetch-recent-questions'
import { RegisterStudentService } from '@/domain/forum/application/services/register-student'
import { AuthenticateStudentService } from '@/domain/forum/application/services/authenticate-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controller/get-question-by-slug.controller'
import { GetQuestionBySlugService } from '@/domain/forum/application/services/get-question-by-slug'
import { EditQuestionController } from './controller/edit-question.controller'
import { EditQuestionService } from '@/domain/forum/application/services/edit-question'
import { DeleteQuestionController } from './controller/delete-question.controller'
import { DeleteQuestionService } from '@/domain/forum/application/services/delete-question'
import { AnswerQuestionController } from './controller/answer-question.controller'
import { AnswerQuestionService } from '@/domain/forum/application/services/answer-question'
import { EditAnswerController } from './controller/edit-answer.controller'
import { EditAnswerService } from '@/domain/forum/application/services/edit-answer'
import { DeleteAnswerController } from './controller/delete-answer.controller'
import { DeleteAnswerService } from '@/domain/forum/application/services/delete-answer'
import { FetchQuestionAnswersController } from './controller/fetch-question-answers.controller'
import { FetchQuestionAnswersService } from '@/domain/forum/application/services/fetch-question-answers'
import { ChooseQuestionBestAnswerController } from './controller/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerService } from '@/domain/forum/application/services/choose-question-best-answer'
import { CommentOnQuestionService } from '@/domain/forum/application/services/comment-on-question'
import { CommentOnQuestionController } from './controller/comment-on-question.controller'
import { DeleteQuestionCommentController } from './controller/delete-question-comment.controller'
import { DeleteQuestionCommentService } from '@/domain/forum/application/services/delete-question-comment'
import { CommentOnAnswerService } from '@/domain/forum/application/services/comment-on-answer'
import { commentOnAnswerController } from './controller/comment-on-answer.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    commentOnAnswerController,
  ],
  providers: [
    CreateQuestionService,
    FetchRecentQuestionsService,
    RegisterStudentService,
    GetQuestionBySlugService,
    AuthenticateStudentService,
    EditQuestionService,
    DeleteQuestionService,
    AnswerQuestionService,
    EditAnswerService,
    DeleteAnswerService,
    FetchQuestionAnswersService,
    ChooseQuestionBestAnswerService,
    CommentOnQuestionService,
    DeleteQuestionCommentService,
    CommentOnAnswerService,
  ],
})
export class HttpModule {}
