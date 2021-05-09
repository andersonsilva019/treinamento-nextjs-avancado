import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "../services/errors/AuthTokenError"
import decode from 'jwt-decode'
import { validateUserPermissions } from "../utils/validateUserPermissions"

type WithSSRAuthOptions = {
  permissions: string[]
  roles: string[]
}

export function withSSRAuth<P>(func: GetServerSideProps<P>, options?: WithSSRAuthOptions): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['auth.token']
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if (options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token)
      const { permissions, roles } = options

      const useHasPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      })

      if (!useHasPermissions) {
        return {
          // notFound: true,  -> Segunda alternatica de redirecionamento
          redirect: {
            destination: '/dashboard',    // Todos os usuários tem permissão

            permanent: false
          }
        }
      }

    }


    try {
      return await func(ctx)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, 'auth.token')
        destroyCookie(ctx, 'auth.RefreshToken')

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}