import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { isAdmin } from "./utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.isAdmin = await isAdmin(token.id as string);

      return session;
    },
  },
});
