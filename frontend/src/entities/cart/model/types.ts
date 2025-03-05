import { Product, ProductId } from "../../product";


export type CartItem = {
  product: Product
  quantity: number
}

export type Cart = {
  itemsMap: Record<ProductId, CartItem>
  version: number
}
