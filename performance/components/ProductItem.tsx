import { memo } from 'react'

type ProductItemProps = {
  product: {
    id: number
    price: number
    title: string
  }
}

function ProductComponet({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  )
}

export const ProductItem = memo(ProductComponet, (prevProps, nextProps) => {
  //Verifica se ambos são o mesmo objeto
  return Object.is(prevProps.product, nextProps.product)
})