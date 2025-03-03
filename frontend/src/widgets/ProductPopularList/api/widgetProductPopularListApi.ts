import { mapProduct } from '@/entities/product'
import type { Product, ProductDto } from '@/entities/product'
import { baseApi } from '@/shared/api'

export const widgetProductPopularListApi = baseApi.injectEndpoints({
  endpoints: build => ({
    popularProducts: build.query<Product[], void>({
      query: () => ({
        url: `/products/popular`,
      }),
      transformResponse: (response: { products: ProductDto[] } ) => response.products.map(mapProduct),
    }),
  }),
})

export const { usePopularProductsQuery } = widgetProductPopularListApi
