type SubscribeButtonProps = {
  priceId: string
}

export function SubscribeButton({priceId}: SubscribeButtonProps){
  return(
    <button 
      type="button" 
      className="
      h-16 w-64 border-0 rounded-3 
      bg-yellow-500 text-gray-900 
      text-xl font-bold 
      flex items-center justify-center
      filter brightness-90 hover:filter-none
      transition-all duration-200
      mt-10
    ">
      Subscribe now
    </button>
  )
}