import { BaseService } from '~/services/base.service'

export class UtilService extends BaseService {
  generateRandomNumber(max) {
    return Math.floor(Math.random() * max)
  }
}
