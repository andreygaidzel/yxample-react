import type { CategoryDto } from '../api/types'
import type { Category, CategoryId } from '../model/types'

export function mapCategory(dto: CategoryDto): Category {
  console.log(dto);
  return {
    id: dto.id as CategoryId,
    name: dto.name,
    image: dto.imageUrl[0],
  }
}
