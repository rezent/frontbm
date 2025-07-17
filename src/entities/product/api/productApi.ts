import { apiClient, API_ENDPOINTS } from '@shared/api';
import type { 
  ApiResponse, 
  PaginatedResponse,
  Product,
  SearchParams,
  Review
} from '@shared/types';

export class ProductApi {
  static async getProducts(params?: SearchParams): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();

    if (params?.query) queryParams.append('query', params.query);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(`filters[${key}]`, value.toString());
        }
      });
    }

    const endpoint = `${API_ENDPOINTS.products}?${queryParams.toString()}`;
    return await apiClient.get<PaginatedResponse<Product>>(endpoint);
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(API_ENDPOINTS.product(id));
    return response.data;
  }

  static async getProductReviews(productId: string): Promise<Review[]> {
    const response = await apiClient.get<ApiResponse<Review[]>>(
      API_ENDPOINTS.productReviews(productId)
    );
    return response.data;
  }

  static async createReview(
    productId: string,
    review: Omit<Review, 'id' | 'productId' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<Review> {
    const response = await apiClient.post<ApiResponse<Review>>(
      API_ENDPOINTS.productReviews(productId),
      review
    );
    return response.data;
  }

  static async searchProducts(query: string, filters?: Record<string, any>): Promise<Product[]> {
    const response = await apiClient.post<ApiResponse<Product[]>>(API_ENDPOINTS.search, {
      query,
      filters,
    });
    return response.data;
  }
} 