import { BaseService } from '~/services/base.service'

export class CategoryService extends BaseService {
  async fetch() {
    return (await this.$client.get('/categories')).data
  }
}
