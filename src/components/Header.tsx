import { ActiveLink } from './ActiveLink'
import { SignInButton } from "./SignInButton"
export function Header() {
  return (
    <header className="h-20 border-b border-gray-800">
      <div className="max-w-5xl h-20 my-0 mx-auto py-0 px-8 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/logo.svg" alt="Logo da ignews" />
          <nav className="ml-20 h-20">
            <ActiveLink href="/">
              <a>Home</a>
            </ActiveLink>
            <ActiveLink href="/posts">
              <a>Posts</a>
            </ActiveLink>
          </nav>
        </div>
        <SignInButton />
      </div>
    </header >
  )
}