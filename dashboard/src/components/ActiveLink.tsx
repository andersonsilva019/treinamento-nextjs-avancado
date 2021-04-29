import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...props }: ActiveLinkProps) {

  const router = useRouter()

  let isActive = false

  if (shouldMatchExactHref && (router.asPath === props.href || router.asPath === props.as)) {
    isActive = true
  }

  if (!shouldMatchExactHref &&
    (router.asPath.startsWith(String(props.href)) ||
      router.asPath.startsWith(String(props.as))
    )) {
    isActive = true
  }

  return (
    <Link {...props}>
      {/* Clonando o primeiro elemento passado como children e alterando sua cor*/}
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}