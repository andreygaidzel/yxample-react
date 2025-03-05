import type { WishlistDto } from '../api/types'
import { mapProduct, Product } from "../../product";

export function mapWishlist(dto: WishlistDto): Product[] {
  return dto.map(product => mapProduct(product))
}
