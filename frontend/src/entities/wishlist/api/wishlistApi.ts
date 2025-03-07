import { WISHLIST_TAG, baseApi } from '@/shared/api'
import { mapWishlist } from '../lib/mapWishlist'
import type { WishlistDto } from './types'
import { Product } from "../../product";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: build => ({
    wishlistProducts: build.query<Product[], void>({
      query: () => ({
        url: `/wishlist/products`,
      }),
      providesTags: [WISHLIST_TAG],
      transformResponse: (response: { wishlist: WishlistDto } ) => {
        return mapWishlist(response.wishlist);
      },
    }),
    addToWishlist: build.mutation<object, number[]>({
      query: productsInWishlistIds => ({
        url: `/wishlist/products`,
        method: 'PATCH',
        body: productsInWishlistIds,
        params: { delay: 500 },
      }),
      invalidatesTags: [WISHLIST_TAG],
    }),
  }),
})

export const { useWishlistProductsQuery, useAddToWishlistMutation }
  = wishlistApi
