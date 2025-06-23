import EmailProvider from 'next-auth/providers/email'
import type {NextAuthOptions} from 'next-auth'

const allowedEmails = ['invite@ukevents.com']

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
  ],
  callbacks: {
    async jwt({token}) {
      if (token?.email && allowedEmails.includes(token.email)) {
        token.role = 'ADMIN'
      } else {
        token.role = 'USER'
      }
      return token
    },
    async session({session, token}) {
      if (session.user) {
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}
