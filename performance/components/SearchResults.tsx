import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"

type SearchResultsProps = {
  results: Array<{
    id: number
    price: number
    title: string
  }>
  onAddToWishlist: (id: number) => void
}

export function SearchResults({ results, onAddToWishlist }: SearchResultsProps) {

  const total = useMemo(() => {
    return results.reduce((total, product) => {
      return total += product.price
    }, 0)
  }, [results])

  return (
    <>
      <h2>{total}</h2>
      <div>
        {results.map(product => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              onAddToWishlist={onAddToWishlist}
            />
          )
        })}
      </div>
    </>
  )
}