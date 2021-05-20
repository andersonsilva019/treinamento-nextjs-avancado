import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from './SignInButton'

jest.mock('next-auth/client',)

describe('<SignInButton/>', () => {
  it('renders correctly when user is not authenticated', () => {

    const useSessionMoked = mocked(useSession)

    useSessionMoked.mockReturnValueOnce([null, false])

    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMoked = mocked(useSession)

    useSessionMoked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'johndoe@johndoe.com' }, expires: 'fake' }
      , false])

    render(
      <SignInButton />
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})