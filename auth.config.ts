import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/dashboard", "/customers", "/invoices"];
      const isProtectedPath = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      if (isProtectedPath) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("[jwt]:", { token, user, account, profile, isNewUser });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token, newSession, trigger, user }) {
      // console.log("[session]:", { session, token, newSession, trigger, user });
      if (token) {
        // session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
