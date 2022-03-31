import { BaseService } from '~/services/base.service'

export class DropdownService extends BaseService {
  async fetch() {
    return (await this.$client.get('/dropdown')).data
  }
}
