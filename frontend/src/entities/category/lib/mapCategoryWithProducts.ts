import type { CategoryWithProductsDto } from '../api/types'
import type { CategoryWithProducts } from '../model/types'
import { mapCategory } from './mapCategory'
import { mapProduct } from "../../product";

export function mapCategoryWithProducts(
  dto: CategoryWithProductsDto,
): CategoryWithProducts {
  return {
    ...mapCategory(dto.category),
    products: dto.products.map(productDto => mapProduct(productDto)),
  }
}
