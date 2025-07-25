import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
  return {
    page: {
      title: 'Каталог товаров - Фильтроэлементы, фильтродержатели, фильтрационные установки',
      description:
        'Каталог оборудования для микрофильтрации: фильтроэлементы, фильтродержатели, фильтрационные установки, фитинги. Российский производитель, доставка по всей России.',
      keywords:
        'каталог фильтроэлементов, фильтродержатели купить, фильтрационные установки, фитинги для фильтров, оборудование микрофильтрации',
      image: '/img/main-catalog-img-1.jpg',
      type: 'website',
      url: 'https://tradeof.ru/catalog',
    },
  };
};
