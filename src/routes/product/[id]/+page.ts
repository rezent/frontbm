import type { PageLoad } from '../../$types';

export const load: PageLoad = ({ params }) => {
  // В реальном проекте здесь будет загрузка данных из API
  return {
    productId: (params as Record<string, string>).id,
  };
};
