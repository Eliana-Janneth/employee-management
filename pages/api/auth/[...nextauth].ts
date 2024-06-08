import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/config/prisma';

/*
    Configuración de NextAuth
*/
const options: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      const usuario = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      const role = usuario?.role;
      return {
        ...session,
        user: {
          ...user,
          role,
        },
      };
    },
  },
  providers: [
    Auth0Provider({
      wellKnown: `https://${process.env.AUTH0_DOMAIN}/`,
      issuer: process.env.AUTH0_DOMAIN,
      authorization: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
      clientId: `${process.env.AUTH0_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
    }),
  ],
  secret: process.env.AUTH0_CLIENT_SECRET,
  adapter: PrismaAdapter(prisma),
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
export { options };