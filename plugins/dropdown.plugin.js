import { DropdownService } from '~/services/dropdown.service';

export default ({ app }, inject) => {
  const dropdownService = new DropdownService(app);

  inject('DropdownService', dropdownService);
};
