import { memo } from 'react'

type ProductItemProps = {
  product: {
    id: number
    price: number
    title: string
  }
  onAddToWishlist: (id: number) => void
}

function ProductComponet({ product, onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>Favoritar</button>
    </div>
  )
}

export const ProductItem = memo(ProductComponet, (prevProps, nextProps) => {
  //Verifica se ambos são o mesmo objeto
  return Object.is(prevProps.product, nextProps.product)
})