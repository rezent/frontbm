import type { LayoutLoad } from './$types';

export const prerender = true;

export const ssr = true;

export const csr = true;

export const load: LayoutLoad = () => {
  return {
    site: {
      title: 'Оборудование для микрофильтрации - Интернет-магазин',
      description: 'ООО «Трейд ОФ» - Российский производитель современных, качественных фильтроэлементов, фильтродержателей и фильтрационных установок для решения различных задач фильтрации и микрофильтрации.',
      url: 'https://tradeof.ru',
      image: '/img/logo.png',
      type: 'website',
      locale: 'ru_RU'
    }
  };
}; 