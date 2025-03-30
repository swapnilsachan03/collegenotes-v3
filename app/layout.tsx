import './globals.css';

import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar'
import getCurrentUser from './actions/getCurrentUser';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CollegeNotes - A website for university students',
  description: 'Discover the ultimate exam preparation resources at CollegeNotes! Unlock the power of comprehensive subject guides, course materials, and invaluable notes for academic success. Our blog brings you expert insights and tips to ace your academics. Elevate your study game today!',
  keywords: 'collegenotes, free notes, toppers notes, university, study materials, exam preparation, college subjects',
  applicationName: 'CollegeNotes',
  viewport: 'width=device-width, initial-scale=1.0',
  creator: 'Swapnil Sachan',
  robots: 'index, follow',

  icons: [
    { rel: "icon", type:"image/png", sizes:"32x32", url:"/favicon/favicon-32x32.png" },
    { rel: "icon", type:"image/png", sizes:"16x16", url:"/favicon/favicon-16x16.png" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon/apple-touch-icon.png" }
  ],

  manifest: "/site.webmanifest",

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.collegenotes.co.in/',
    siteName: 'CollegeNotes',
    title: 'CollegeNotes - A website for university students',
    description: 'Discover the ultimate exam preparation resources at CollegeNotes! Unlock the power of comprehensive subject guides, course materials, and invaluable notes for academic success. Our blog brings you expert insights and tips to ace your academics. Elevate your study game today!',
    images: [
      {
        url: 'https://www.collegenotes.co.in/images/meta-image.jpg',
        alt: 'CollegeNotes',
        width: 1200,
        height: 630,
      },
    ],
    countryName: 'India',
  },

  twitter: {
    site: "CollegeNotes",
    siteId: "@CollegeNotes",
    creator: "Swapnil Sachan",
    creatorId: "@swapnilsachan03",
    description: "Discover the ultimate exam preparation resources at CollegeNotes! Unlock the power of comprehensive subject guides, course materials, and invaluable notes for academic success. Our blog brings you expert insights and tips to ace your academics. Elevate your study game today!",
    title: "CollegeNotes - A website for university students",
    images: [
      {
        url: 'https://www.collegenotes.co.in/images/og-image.png',
        alt: 'CollegeNotes',
        width: 1200,
        height: 630,
      },
    ]
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zim0dvu.css"/>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-M2VTB22JD3" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-M2VTB22JD3');
          `}
        </Script>

        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3309007161080471" crossOrigin="anonymous" />
      </head>

      <body className={`${inter.className} transition ease-linear duration-200`}>
        <Navbar currentUser={currentUser} />
        {children}
        <Footer/>
        <Toaster />
      </body>
    </html>
  )
}
