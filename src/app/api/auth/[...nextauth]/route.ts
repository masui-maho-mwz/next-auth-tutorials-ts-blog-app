import { PrismaClient } from '@prisma/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
