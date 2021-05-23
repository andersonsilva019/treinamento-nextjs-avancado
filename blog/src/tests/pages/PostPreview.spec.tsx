import { render, screen } from '@testing-library/react'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { getPrismicClient } from '../../services/prismic'
import { useRouter } from 'next/router'

const post = {
  slug: 'slug-post-1',
  title: 'Post 1',
  content: '<p>conteúdo do post</p>',
  updatedAt: '20 de Junho'
}

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

describe('Post preview page', () => {
  it('renders correctly', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)


    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('conteúdo do post')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading ?')).toBeInTheDocument()
  })

  // it('redirects user to full post when user is subscribe', async () => {
  //   const useSessionMocked = mocked(useSession)
  //   const useRouterMocked = mocked(useRouter)

  //   const pushMock = jest.fn()

  //   useSessionMocked.mockReturnValueOnce([
  //     { activeSubscription: 'fake-subscription' },
  //     false
  //   ] as any)

  //   useRouterMocked.mockReturnValueOnce({
  //     push: pushMock
  //   } as any)

  //   render(<Post post={post} />)

  //   expect(pushMock).toHaveBeenCalledWith('/posts/slug-post-1')

  // })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'Post 1' }
          ],
          content: [
            { type: 'paragraph', text: 'conteúdo do post' }
          ]
        },
        last_publication_date: '05-01-2021'
      } as any)
    } as any)

    const response = await getStaticProps({ params: { slug: 'slug-post-1' } })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'slug-post-1',
            title: 'Post 1',
            content: '<p>conteúdo do post</p>',
            updatedAt: '01 de maio de 2021'
          }
        }
      })
    )
  })
})