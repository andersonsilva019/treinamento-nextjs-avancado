import { render, screen } from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts'
import { mocked } from 'ts-jest/utils'
import { getPrismicClient } from '../../services/prismic'

const posts = [
  {
    slug: 'slug-post-1',
    title: 'Post 1',
    excerpt: 'resumo do post',
    updatedAt: '20 de Junho'
  }
]

jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText('Post 1')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'slug-post-1',
            data: {
              title: [
                { type: 'heading', text: 'Post 1' }
              ],
              content: [
                { type: 'paragraph', text: 'resumo do post' }
              ]
            },
            last_publication_date: '04-10-2021',
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'slug-post-1',
              title: 'Post 1',
              excerpt: 'resumo do post',
              updatedAt: '10 de abril de 2021'
            }
          ]
        }
      })
    )

  })
})