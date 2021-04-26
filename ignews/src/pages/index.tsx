import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

type HomeProps = {
  product:{
    priceId: string,
    amount: number,
  }
}

export default function Home({product}: HomeProps) {
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
          <span className="text-cyan-500 font-bold">for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding"/>
      </main>
    </>
  )
}

// SSG
export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1Ii0c8DJo4ir0TdcZjs0icd0')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    }, 
    revalidate: 60 * 60 * 24 // 24h
  }
}