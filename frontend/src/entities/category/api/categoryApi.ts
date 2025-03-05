import { baseApi } from '@/shared/api'
import { mapCategory } from '../lib/mapCategory'
import { mapCategoryWithProducts } from '../lib/mapCategoryWithProducts'
import type { Category, CategoryWithProducts } from '../model/types'
import type {
  CategoryDetailsRequestArgs,
  CategoryDto,
  CategoryWithProductsDto,
} from './types'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    popularCategories: build.query<Category[], void>({
      query: () => ({
        url: `/categories/popular`,
      }),
      transformResponse: (response: { features: CategoryDto[] } ) => {
        return response.features.map(mapCategory)
      },
    }),
    categoryDetails: build.query<
      CategoryWithProducts,
      CategoryDetailsRequestArgs
    >({
      query: ({ sortBy, categoryId }) => ({
        url: `/categories/${categoryId}`,
        params: { sortBy, delay: 400 },
      }),
      transformResponse: (response: CategoryWithProductsDto) =>
        mapCategoryWithProducts(response),
    }),
  }),
})

export const { usePopularCategoriesQuery, useCategoryDetailsQuery }
  = categoryApi
