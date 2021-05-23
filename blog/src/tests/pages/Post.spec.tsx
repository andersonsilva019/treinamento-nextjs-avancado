import { render, screen } from '@testing-library/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { mocked } from 'ts-jest/utils'
import { getSession } from 'next-auth/client'
import { getPrismicClient } from '../../services/prismic'

const post = {
  slug: 'slug-post-1',
  title: 'Post 1',
  content: '<p>conteúdo do post</p>',
  updatedAt: '20 de Junho'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)
    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('conteúdo do post')).toBeInTheDocument()
  })

  // it('redirects user if no subscription is found', async () => {

  //   const getSessionMocked = mocked(getSession)

  //   getSessionMocked.mockResolvedValueOnce(null)

  //   const response = await getServerSideProps({
  //     params: {
  //       slug: 'slug-post-1',
  //     }
  //   } as any)

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       redirect: expect.objectContaining({
  //         destination: '/',
  //       }
  //       )
  //     })
  //   )
  // })

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-subscription'
    } as any)

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

    const response = await getServerSideProps({
      params: {
        slug: 'slug-post-1',
      }
    } as any)

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

  // it('loads initial data', async () => {
  //   const getPrismicClientMocked = mocked(getPrismicClient)

  //   getPrismicClientMocked.mockReturnValueOnce({
  //     query: jest.fn().mockResolvedValueOnce({
  //       results: [
  //         {
  //           uid: 'slug-post-1',
  //           data: {
  //             title: [
  //               { type: 'heading', text: 'Post 1' }
  //             ],
  //             content: [
  //               { type: 'paragraph', text: 'resumo do post' }
  //             ]
  //           },
  //           last_publication_date: '04-10-2021',
  //         }
  //       ]
  //     })
  //   } as any)

  //   const response = await getStaticProps({})

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       props: {
  //         posts: [
  //           {
  //             slug: 'slug-post-1',
  //             title: 'Post 1',
  //             excerpt: 'resumo do post',
  //             updatedAt: '10 de abril de 2021'
  //           }
  //         ]
  //       }
  //     })
  //   )

  // })
})