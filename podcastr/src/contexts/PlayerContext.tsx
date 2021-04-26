import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodeList: Episode[]
  isLooping: boolean
  isPlaying: boolean
  isShuffling: boolean
  hasPrevious: boolean
  hasNext: boolean
  currentEpsiodeIndex: number
  play: (episode: Episode) => void
  playList: (list: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  toggleLoop: () => void
  togglePlay: () => void
  toggleShuffling: () => void
  setPlayingState: (state: boolean) => void
  clearPlayState: () => void
}

type PlayerContextProviderProps = {
  children: ReactNode
}

const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpsiodeIndex, setCurrentEpsiodeIndex] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpsiodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpsiodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffling() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpsiodeIndex > 0
  const hasNext = isShuffling || (currentEpsiodeIndex + 1) < episodeList.length

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpsiodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpsiodeIndex(currentEpsiodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpsiodeIndex(currentEpsiodeIndex - 1)
    }
  }

  function clearPlayState() {
    setEpisodeList([])
    setCurrentEpsiodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpsiodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        isLooping,
        isShuffling,
        toggleShuffling,
        toggleLoop,
        togglePlay,
        setPlayingState,
        hasPrevious,
        clearPlayState,
        hasNext
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}