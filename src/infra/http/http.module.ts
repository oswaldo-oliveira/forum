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

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionService,
    FetchRecentQuestionsService,
    RegisterStudentService,
    AuthenticateStudentService,
  ],
})
export class HttpModule {}
