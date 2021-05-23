import { GetStaticPaths, GetStaticProps } from "next"
import { getSession, useSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Link from "next/link"
import { RichText } from "prismic-dom"
import { useEffect } from "react"
import { getPrismicClient } from "../../../services/prismic"

type PostPreviewProps = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export default function PostPreview({ post }: PostPreviewProps) {

  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className="max-w-5xl my-0 mx-auto py-0 px-8">
        <article className="max-w-3xl mt-20 mx-auto mb-0">
          <h1 className="text-6xl font-black">{post.title}</h1>
          <time className="text-base text-gray-300 mt-6 block">{post.updatedAt}</time>
          <div
            className="mt-8 leading-8 text-lg text-gray-100 postContent previewContent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="p-8 text-center bg-gray-850 rounded-full text-xl font-bold mt-16 mx-0 mb-8">
            Wanna continue reading ?
            <Link href="/">
              <a className="text-yellow-500 ml-2 hover:underline">Subscribe now</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug: slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.slice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30m
  }
}