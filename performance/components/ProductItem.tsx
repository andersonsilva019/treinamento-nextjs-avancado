import { memo, useState } from 'react'
import { AddToProductWishListProps } from './AddToProductWishList'
import dynamic from 'next/dynamic'

const AddToProductWishList = dynamic<AddToProductWishListProps>(() => {
  return import('./AddToProductWishList').then(mod => mod.AddToProductWishList)
}, {
  loading: () => <span>Carregando...</span>
})

type ProductItemProps = {
  product: {
    id: number
    price: number
    priceFormatted: string
    title: string
  }
  onAddToWishlist: (id: number) => void
}

function ProductComponet({ product, onAddToWishlist }: ProductItemProps) {

  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  // async function showFormattedDate() {
  //   const { format } = await import('date-fns')

  //   format()
  //   .
  //   .
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      {isAddingToWishList && (
        <AddToProductWishList
          onAddToProductWishList={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductComponet, (prevProps, nextProps) => {
  //Verifica se ambos são o mesmo objeto
  return Object.is(prevProps.product, nextProps.product)
})