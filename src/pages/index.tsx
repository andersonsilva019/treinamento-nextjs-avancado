import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Blog</title>
      </Head>
      <main className="max-w-5xl my-0 mx-auto py-0 px-8 h-home flex items-center justify-between mt-36">
        <section className="max-w-xl">
          <span className="text-2xl font-bold">Hey, welcome</span>
          <h1 className="text-7xl leading-16 font-black mt-10 ">News about the <span className="text-cyan-500">React</span> world.</h1>
          <p className="text-2xl leading-9 mt-6">Get acess to all the publications <br/> 
          <span className="text-cyan-500 font-bold">for $9.90 month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding"/>
      </main>
    </>
  )
}