import { GetStaticProps } from "next";
import Link from "next/link";
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";

type Post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string
}

type PostProps = {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className="max-w-5xl my-0 mx-auto py-0 px-8">
        <div className="max-w-3xl mt-20 mx-auto">
          {posts.map((post, index) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a
                className={`group block mb-8 pt-8 ${index !== 0 ? 'border-t' : ''} border-gray-700`}
              >
                <time className="text-base flex items-center text-gray-300">
                  {post.updatedAt}
                </time>
                <strong
                  className="block text-2xl mt-4 leading-8 group-hover:text-yellow-500 transition-all duration-200"
                >
                  {post.title}
                </strong>
                <p className="text-gray-300 mt-2 leading-6 ">
                  {post.excerpt}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  return {
    props: {
      posts
    }
  }
}