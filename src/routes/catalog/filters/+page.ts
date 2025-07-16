import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    page: {
      title: 'Фильтроэлементы - Каталог',
      description: 'Фильтроэлементы для промышленного применения',
      keywords: 'фильтроэлементы, фильтры, промышленные фильтры',
      url: '/catalog/filters',
      image: '/img/page-bg.jpg',
      type: 'website'
    }
  };
}; 