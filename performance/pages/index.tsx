import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults"

type Results = {
  totalPrice: number
  data: Array<{
    id: number
    price: number
    priceFormatted: string
    title: string
  }>
}

export default function Home() {

  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  })

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)

    const data = await response.json()

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(product.price)
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total += product.price
    }, 0)

    setResults({ totalPrice, data: products })
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}
