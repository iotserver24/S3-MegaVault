import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '@/components/SessionProvider';
import './globals.css';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MegaVault - Professional Cloud Storage',
  description: 'Secure, fast, and reliable cloud storage solution for your business',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Toaster position="top-center" />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
