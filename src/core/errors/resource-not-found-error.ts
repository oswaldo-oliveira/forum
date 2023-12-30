import { ServiceError } from '@/core/errors/service-erros'

export class ResourceNotFoundError extends Error implements ServiceError {
  constructor() {
    super('Resource not found.')
  }
}
