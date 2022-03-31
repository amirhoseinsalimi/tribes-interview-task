import en from '~/l18n/translations/en.json';

export default (_ctx, inject) => {
  const __ = (keys = '') => {
    if (Array.isArray(keys)) {
      let str = '';

      keys.forEach((el) => {
        str += (keys[el] || el) + ' ';
      });

      return str.trim();
    }

    return en[keys] || keys;
  };

  inject('__', __);
};
