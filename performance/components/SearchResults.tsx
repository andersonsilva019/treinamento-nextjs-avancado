import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"

type SearchResultsProps = {
  totalPrice: number
  results: Array<{
    id: number
    price: number
    priceFormatted: string
    title: string
  }>
  onAddToWishlist: (id: number) => void
}

export function SearchResults({
  totalPrice,
  results,
  onAddToWishlist
}: SearchResultsProps) {
  return (
    <>
      <h2>{totalPrice}</h2>
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