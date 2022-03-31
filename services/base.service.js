export class BaseService {
  constructor (app) {
    this.$app = app;

    this.$client = app.$axios;
  }
}
