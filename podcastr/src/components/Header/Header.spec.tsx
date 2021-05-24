import { render, screen } from '@testing-library/react'
import { Header } from '.'


describe('<Header/ >', () => {
  it('rendery correctly', () => {
    render(<Header />)

    expect(screen.getByText('O melhor para você ouvir, sempre'))
      .toBeInTheDocument()
  })
})