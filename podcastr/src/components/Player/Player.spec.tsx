import { screen, render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { usePlayer } from '../../contexts/PlayerContext'
import { Player } from '.'

jest.mock('../../contexts/PlayerContext')


const episodes = [
  {
    title: 'Episodio titulo',
    members: 'Membro do episodio',
    thumbnail: '/play',
    duration: 1200,
    url: 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/audios/funcional.m4a'
  }
]

describe('<Player />', () => {
  it('rendering episode correctly', () => {

    const usePlayerMocked = mocked(usePlayer)

    const setPlayingStateMocked = jest.fn()

    usePlayerMocked.mockReturnValueOnce({
      currentEpsiodeIndex: 0,
      episodeList: episodes,
      setPlayingState: setPlayingStateMocked.mockReturnValueOnce(true)
    } as any)

    // https://github.com/jsdom/jsdom/issues/2155
    window.HTMLMediaElement.prototype.pause = () => {/* do nothing */ }
    render(<Player />)

    expect(screen.getByText('Episodio titulo')).toBeInTheDocument()
    expect(screen.getByText('Membro do episodio')).toBeInTheDocument()
    expect(screen.getByTestId('#audio')).toBeInTheDocument()
    expect(screen.getByAltText('thumbnail')).toBeInTheDocument()
  })
})