import { ProductDto } from "../../product";

export type CategoryDto = {
  id: number
  name: string
  imageUrl: string[]
}

export type CategoryWithProductsDto = {
  category: CategoryDto
  products: ProductDto[]
}

export type CategoryDetailsRequestArgs = {
  categoryId: number
  sortBy?: string
}
