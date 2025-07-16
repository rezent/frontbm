import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    page: {
      title: 'Сертификаты - ООО «Трейд ОФ» - Сертифицированная продукция',
      description: 'Сертификаты качества и соответствия на фильтроэлементы, фильтродержатели и фильтрационные установки ООО «Трейд ОФ». Соответствие международным стандартам.',
      keywords: 'сертификаты качества, сертификаты соответствия, фильтры сертификаты, ГОСТ, ISO, сертификация продукции',
      image: '/img/certificate-img-1.jpg',
      type: 'website',
      url: 'https://tradeof.ru/certificates'
    }
  };
}; 