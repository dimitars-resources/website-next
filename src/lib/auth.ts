import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { auth, handlers, signIn, signOut } = NextAuth({
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
      return session;
    },
  },
});
