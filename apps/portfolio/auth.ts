import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true,
  callbacks: {
    signIn({ user }) {
      return user.email === process.env.ADMIN_EMAIL;
    },
  },
});
