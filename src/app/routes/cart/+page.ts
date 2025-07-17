import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
  return {
    page: {
      title: 'Корзина покупок - Оборудование для микрофильтрации',
      description:
        'Корзина покупок оборудования для микрофильтрации. Оформите заказ фильтроэлементов, фильтродержателей и фильтрационных установок с доставкой по всей России.',
      keywords: 'корзина покупок, заказ фильтров, купить фильтроэлементы, оформление заказа',
      image: '/img/busket-img.jpg',
      type: 'website',
      url: 'https://tradeof.ru/cart',
      noindex: true, // Корзина не должна индексироваться
    },
  };
};
