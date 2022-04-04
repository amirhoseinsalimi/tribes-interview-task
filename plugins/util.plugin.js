import { UtilService } from '~/services/util.service';

export default ({ app }, inject) => {
  const utilService = new UtilService(app);

  inject('UtilService', utilService);
};
