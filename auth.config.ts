import { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage = nextUrl.pathname.startsWith("/auth")
      const isDashboardPage = nextUrl.pathname.startsWith("/dashboard")
      const isAdminPage = nextUrl.pathname.startsWith("/admin")

      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl))
        }
        return true
      }

      if (isDashboardPage || isAdminPage) {
        if (isLoggedIn) return true
        return false // Redirect to login
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id as string;
      }
      return session
    },
  },
  providers: [], 
} satisfies NextAuthConfig
