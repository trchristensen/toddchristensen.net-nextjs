import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "config/env.config";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_KEY,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
})