import type { Product } from '$lib/types/api';

export interface SiteInfo {
  url: string;
  title: string;
  description: string;
  image: string;
  locale?: string;
}

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Генерирует структурированные данные для организации
 */
export function generateOrganizationSchema(site: SiteInfo): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ООО «БМ ФИЛЬТР»',
    url: site.url,
    logo: `${site.url}${site.image}`,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Обнинск',
      addressCountry: 'RU',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-800-700-85-73',
      contactType: 'customer service',
      areaServed: 'RU',
    },
    sameAs: ['https://vk.com/tradeof', 'https://t.me/tradeof'],
  };
}

/**
 * Генерирует структурированные данные для веб-сайта
 */
export function generateWebsiteSchema(site: SiteInfo): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Оборудование для микрофильтрации',
    url: site.url,
    description: site.description,
    publisher: {
      '@type': 'Organization',
      name: 'ООО «БМ ФИЛЬТР»',
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}${site.image}`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/catalog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Генерирует структурированные данные для товара
 */
export function generateProductSchema(product: Product, site: SiteInfo): Record<string, unknown> {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: `${site.url}${product.images?.[0] || ''}`,
    url: `${site.url}/product/${product.id}`,
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ООО «Трейд ОФ»',
      },
    },
  };

  if (product.oldPrice) {
    schema.offers.highPrice = product.oldPrice.toString();
    schema.offers.lowPrice = product.price.toString();
  }

  if (product.isNew) {
    schema.additionalProperty = {
      '@type': 'PropertyValue',
      name: 'Новинка',
      value: 'true',
    };
  }

  return schema;
}

/**
 * Генерирует структурированные данные для списка товаров
 */
export function generateItemListSchema(
  products: Product[],
  site: SiteInfo
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Каталог оборудования для микрофильтрации',
    description: 'Фильтроэлементы, фильтродержатели, фильтрационные установки',
    url: `${site.url}/catalog`,
    numberOfItems: products.length,
    itemListElement: products.map((product: Product, index: number) => ({
      '@type': 'Product',
      position: index + 1,
      name: product.title,
      url: `${site.url}/product/${product.id}`,
      image: `${site.url}${product.images?.[0] || ''}`,
      description: product.description,
      offers: {
        '@type': 'Offer',
        price: product.price.toString(),
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
      },
    })),
  };
}

/**
 * Генерирует структурированные данные для хлебных крошек
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Breadcrumb[],
  site: SiteInfo
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item: Breadcrumb, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

/**
 * Генерирует структурированные данные для FAQ
 */
export function generateFAQSchema(faqs: FAQ[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: FAQ) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Генерирует структурированные данные для контактной информации
 */
export function generateContactSchema(site: SiteInfo): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Контакты',
    url: `${site.url}/contacts`,
    mainEntity: {
      '@type': 'Organization',
      name: 'ООО «БМ ФИЛЬТР»',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Обнинск',
        addressCountry: 'RU',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+7-800-700-85-73',
          contactType: 'customer service',
          areaServed: 'RU',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+7-495-797-13-37',
          contactType: 'customer service',
          areaServed: 'RU',
        },
      ],
    },
  };
}
