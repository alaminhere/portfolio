import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans, Space_Grotesk } from 'next/font/google';

import './globals.css';
import SessionProviderWrap from '@/provider/SessionProvider';
import CustomCursor from '@/components/CustomCursor';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});
const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const dMSans = DM_Sans({
  variable: '--font-dMSans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Md. Alamin | Full-Stack Developer & Web Engineer',

  description:
    'Explore the portfolio of Md. Alamin, a Full-Stack Developer focused on building modern web applications, reliable backend systems, and real-world digital products with Next.js, Node.js, Express, and modern database technologies.',

  keywords: [
    'Md. Alamin',
    'Full-Stack Developer',
    'Web Developer',
    'Software Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'Express.js Developer',
    'TypeScript Developer',
    'Prisma ORM',
    'MongoDB Developer',
    'MySQL Developer',
    'Web Application Developer',
    'Backend Developer',
    'Frontend Developer',
    'Developer Portfolio',
  ],

  authors: [{ name: 'Md. Alamin', url: SITE_URL }],
  creator: 'Md. Alamin',
  publisher: 'Md. Alamin',

  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: 'Md. Alamin | Full-Stack Developer',

    description:
      'Full-Stack Developer building modern web applications, reliable backend systems, and real-world digital products with Next.js, React, Node.js, and TypeScript.',

    siteName: "Alamin's Portfolio",

    url: SITE_URL,

    type: 'website',

    locale: 'en_US',

    images: [
      {
        url: `${SITE_URL}/admin_overview_.webp`,
        width: 1200,
        height: 630,
        alt: 'Md. Alamin Portfolio Preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Md. Alamin | Full-Stack Developer',

    description:
      'Building modern, reliable web applications with Next.js, React, Node.js, Express, TypeScript, and modern database technologies.',

    images: [`${SITE_URL}/admin_overview_.webp`],

    creator: '@',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'MID-BfusUrUH6pHhcVPb3vds8maah1ld4XKFHMPryIM',
  },

  category: 'technology',
};

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Md. Alamin',
  url: SITE_URL,
  image: `${SITE_URL}/admin_overview_.webp`,
  jobTitle: 'Full-Stack Developer',
  description:
    'Full-Stack Developer building modern, reliable web applications and backend systems with Next.js, React, Node.js, Express, TypeScript, Prisma, MongoDB, and MySQL.',
  sameAs: [
    `https://github.com/alamin-one`,
    `https://www.linkedin.com/in/alamin-one/`,
    `https://twitter.com`,
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Express.js',
    'Prisma ORM',
    'MongoDB',
    'MySQL',
    'Redux Toolkit',
    'RTK Query',
    'Tailwind CSS',
    'Cloudinary',
    'REST API Development',
    'Full-Stack Web Development',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${bricolageGrotesque.variable} ${dMSans.variable} h-full antialiased selection:text-primary selection:bg-primary/10`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
      </head>

      <body className="min-h-full bg-background">
        <SessionProviderWrap>
          {/* Global Background */}
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-size-[56px_56px] opacity-25 mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            <div className="absolute -top-32 right-0 h-130 w-130 rounded-full bg-primary/5 md:bg-primary/12 blur-[120px]" />
            <div className="absolute bottom-0 -left-32 h-105 w-105 rounded-full bg-accent/2 md:bg-accent/5 blur-[120px]" />
          </div>

          <CustomCursor />

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </SessionProviderWrap>
      </body>
    </html>
  );
}
