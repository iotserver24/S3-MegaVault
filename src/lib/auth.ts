import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getStorageConfig } from './storage';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        try {
          // Single-user authentication: check against environment variables
          const envUserEmail = process.env.USER_EMAIL;
          const envUserPassword = process.env.USER_PASSWORD;

          if (!envUserEmail || !envUserPassword) {
            console.error('Environment variables USER_EMAIL or USER_PASSWORD not set');
            throw new Error('System configuration error');
          }

          // Check if credentials match environment variables
          if (credentials.email !== envUserEmail || credentials.password !== envUserPassword) {
            console.error('Invalid credentials for single user');
            throw new Error('Invalid email or password');
          }

          // Get storage configuration
          const storageConfig = getStorageConfig();
          const folderId = storageConfig.getUserFolderId();

          // Return user information for token
          return {
            id: credentials.email,
            email: credentials.email,
            folderId: folderId,
            isActive: true
          };
        } catch (error) {
          console.error('Auth error:', error);
          // Don't expose internal errors to client
          throw new Error('Invalid email or password');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add custom user data to token
        token.folderId = (user as any).folderId;
        token.isActive = (user as any).isActive;
      }

      // For single user system, always keep user active
      if (token.email === process.env.USER_EMAIL) {
        token.isActive = true;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Add custom token data to session user
        (session.user as any).folderId = token.folderId;
        (session.user as any).isActive = token.isActive;
      }
      return session;
    }
  },
  pages: {
    signIn: '/',
    signOut: '/',
  },
}; 