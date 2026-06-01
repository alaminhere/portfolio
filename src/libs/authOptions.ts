import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/libs/prisma';
import type { NextAuthOptions } from 'next-auth';
import { UserData } from '@/libs/types';

declare module 'next-auth/jwt' {
  interface JWT {
    user?: UserData;
  }
}
declare module 'next-auth' {
  interface Session {
    user?: UserData;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    Credentials({
      credentials: { email: {}, code: {} },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) {
          throw new Error('Email and verification code are required!!');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('User not found!');
        }

        if (!user.expiryDate || user.expiryDate.getTime() <= Date.now()) {
          throw new Error('Verification code has expired.');
        }

        if (!user.verifyCode || user.verifyCode !== credentials.code) {
          throw new Error('Incorrect verification code!');
        }

        await prisma.user.update({
          where: {
            email: credentials.email,
          },
          data: {
            verifyCode: null,
            expiryDate: null,
          },
        });
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          github: user.github,
          linkedin: user.linkedin,
          facebook: user.facebook,
          whatsapp: user.whatsapp,
          location: user.location,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'credentials') {
        return true;
      }
      return false;
    },

    async jwt({ token, user }) {
      const email = user?.email || token.email;

      if (!email) return token;

      const userByEmail = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          github: true,
          linkedin: true,
          facebook: true,
          whatsapp: true,
          location: true,
          resume: true,
        },
      });

      if (userByEmail) {
        token.user = userByEmail;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/',
    error: '/',
  },
};

export default authOptions;
