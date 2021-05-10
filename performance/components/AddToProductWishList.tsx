export type AddToProductWishListProps = {
  onAddToProductWishList: () => void
  onRequestClose: () => void
}

export function AddToProductWishList({
  onAddToProductWishList,
  onRequestClose
}: AddToProductWishListProps) {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToProductWishList}>Adicionar</button>
      <button onClick={onRequestClose}>Cancelar</button>
    </span>
  )
}