import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { ReadNotificationService } from '@/domain/notification/application/services/read-notification'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/notification/:notificationId/read')
export class ReadNotificationController {
  constructor(private readNotification: ReadNotificationService) {}

  @Patch()
  @HttpCode(204)
  async handler(
    @CurrentUser() user: UserPayload,
    @Param('notificationId') notificationId: string,
  ) {
    const result = await this.readNotification.execute({
      notificationId,
      recipientId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
