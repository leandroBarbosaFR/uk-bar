import EmailProvider from 'next-auth/providers/email'
import type {NextAuthOptions} from 'next-auth'
import type {JWT} from 'next-auth/jwt'
import type {Session} from 'next-auth'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
      role?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    email?: string
  }
}

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
    async jwt({token}: {token: JWT}) {
      if (token?.email && allowedEmails.includes(token.email)) {
        token.role = 'ADMIN'
      } else {
        token.role = 'USER'
      }
      return token
    },
    async session({session, token}: {session: Session; token: JWT}) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}
