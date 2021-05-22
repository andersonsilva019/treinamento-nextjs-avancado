import { render, screen } from '@testing-library/react'
import Home from '../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-priceId', amount: 'R$12,00' }} />)
    expect(screen.getByText(/R\$12,00/i)).toBeInTheDocument()
  })
})