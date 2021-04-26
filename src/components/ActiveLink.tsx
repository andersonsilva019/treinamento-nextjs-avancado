import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;   // Recebe apenas um elemento
}

export function ActiveLink({ children, ...props }: ActiveLinkProps) {

  const { asPath } = useRouter()

  const className = asPath === props.href
    ? `border-b-2 border-yellow-500 text-white font-bold inline-block relative h-20 py-0 px-2 leading-16 hover:text-white transition-all duration-200`
    : 'inline-block relative h-20 py-0 px-2 text-gray-300 leading-16 hover:text-white transition-all duration-200'

  return (
    <Link {...props}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}