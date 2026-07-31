import { useQuery } from '@tanstack/react-query'
import { ProductService } from '@/entities/product/api/product.service'

export function useProduct(searchTerm?: string | null) {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductService.getAllProducts(searchTerm),
  })

  return {
    data,
    isLoading,
  }
}
