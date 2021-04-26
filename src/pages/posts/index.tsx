import Head from "next/head";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className="max-w-5xl my-0 mx-auto py-0 px-8">
        <div className="max-w-3xl mt-20 mx-auto">
          <a href="#" className="group block mb-8 pt-8 border-t border-gray-700">
            <time className="text-base flex items-center text-gray-300">
              21 de Abril de 2021
            </time>
            <strong className="block text-2xl mt-4 leading-8 group-hover:text-yellow-500 transition-all duration-200">
              Creating a Monorepo with Lerna & Yarn Workspaces
            </strong>
            <p className="text-gray-300 mt-2 leading-6 ">
              In this guide, you will learn how to create
              a Monorepo to manage multiple packages with
              a shared build, test, and release process.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}