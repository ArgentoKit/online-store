import { useQuery } from '@tanstack/react-query'
import { ProductService } from '@/entities/product/api/product.service'

export function useProduct() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductService.getAllProducts(),
  })

  return {
    data,
    isLoading,
  }
}
