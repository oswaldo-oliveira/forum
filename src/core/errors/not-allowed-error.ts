import { ServiceError } from '@/core/errors/service-erros'

export class NotAllowedError extends Error implements ServiceError {
  constructor() {
    super('Not allowed.')
  }
}
