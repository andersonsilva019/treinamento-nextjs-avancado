import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from "nookies"

export function withSSRAuth<P>(func: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    if (!cookies['auth.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return await func(ctx)
  }
}