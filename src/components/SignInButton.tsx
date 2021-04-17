import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
export function SignInButton(){

  const isUserLoggedIn = true

  return isUserLoggedIn ? (
    <button 
      type="button" 
      className="
        h-12 
        rounded-3 
        bg-gray-850 
        border-0 
        py-0 
        px-6 
        flex
        items-center 
        justify-center 
        text-white 
        font-bold 
        filter brightness-90 hover:filter-none
        transition-all duration-200
        "
    >
      <FaGithub color="#04d361" className="w-5 h-5 mr-4 "/>
      Anderson Silva
      <FiX color="#737380" className="ml-4"/>
    </button>
  ) : (
    <button 
      type="button" 
      className="
        h-12 
        rounded-3 
        bg-gray-850 
        border-0 
        py-0 
        px-6 
        flex
        items-center 
        justify-center 
        text-white 
        font-bold 
        filter brightness-90 hover:filter-none
        transition-all duration-200
        "
    >
      <FaGithub color="#eba417" className="w-5 h-5 mr-4 "/>
      Sign in with Github
    </button>
  )
}