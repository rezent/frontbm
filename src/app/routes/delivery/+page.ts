import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    page: {
      title: 'Доставка - ООО «БМ ФИЛЬТР» - Доставка фильтров по всей России',
      description:
        'Доставка фильтроэлементов, фильтродержателей и фильтрационных установок по всей России. Быстрая доставка, отслеживание груза, различные способы доставки.',
      keywords:
        'доставка фильтров, доставка по России, транспортная компания, отслеживание груза, фильтроэлементы доставка',
      image: '/img/truck-delivery.jpg',
      type: 'website',
      url: 'https://tradeof.ru/delivery',
    },
  };
};
