import { ServiceError } from '@/core/errors/service-erros'

export class WrongCredentialsError extends Error implements ServiceError {
  constructor() {
    super('Credentials are not valid.')
  }
}
