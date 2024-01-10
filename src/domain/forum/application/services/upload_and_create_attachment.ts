import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachment-repository'
import { Uploader } from '../storage/uploader'

interface UploadAndCreateAttachmentServiceRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentServiceResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>

@Injectable()
export class UploadAndCreateAttachmentService {
  constructor(
    private attachmentRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentServiceRequest): Promise<UploadAndCreateAttachmentServiceResponse> {
    if (!/^(image\/(jpeg|png|jpg)|application\/pdf)$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentRepository.create(attachment)

    return right({
      attachment,
    })
  }
}
