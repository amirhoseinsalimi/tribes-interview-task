import { CategoryService } from '~/services/category.service';

export default ({ app }, inject) => {
  const categoryService = new CategoryService(app);

  inject('CategoryService', categoryService);
};
