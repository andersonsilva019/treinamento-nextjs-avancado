import { SignInButton } from "./SignInButton"
export function Header(){

  const activeLink = 'border-b-2 border-yellow-500 text-white font-bold'

  return(
    <header className="h-20 border-b border-gray-800">
      <div className="max-w-5xl h-20 my-0 mx-auto py-0 px-8 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/logo.svg" alt="Logo da ignews"/>
          <nav className="ml-20 h-20">
            <a className={`inline-block relative h-20 py-0 px-2 ${!!activeLink ? activeLink : 'text-gray-300'} leading-16 active-link  hover:text-white transition-all duration-200`}>
              Home
            </a>
            <a className="ml-8 inline-block relative h-20  py-0 px-2 leading-16 text-gray-300  hover:text-white transition-all duration-200">
              Posts
            </a>
          </nav>
        </div>
        <SignInButton/>
      </div>
    </header>
  )
} 