import { render } from '@testing-library/react'
import { ActiveLink } from './ActiveLink'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('<ActiveLink/>', () => {
  it('active link renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/">
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toBeInTheDocument()
  })

  it('active link is receiving border-yellow-500 class', () => {
    const { container } = render(
      <ActiveLink href="/">
        <a>Home</a>
      </ActiveLink>
    )
    expect(container.firstChild).toHaveClass('border-yellow-500')
  })

  it('inactive link is not receive border-yellow-500 class', () => {
    const { container } = render(
      <ActiveLink href="/posts">
        <a>Posts</a>
      </ActiveLink>
    )
    expect(container.firstChild).not.toHaveClass('border-yellow-500')
  })

})