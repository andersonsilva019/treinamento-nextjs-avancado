import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"

type SearchResultsProps = {
  results: Array<{
    id: number
    price: number
    title: string
  }>
}

export function SearchResults({ results }: SearchResultsProps) {

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
          return <ProductItem product={product} key={product.id} />
        })}
      </div>
    </>
  )
}