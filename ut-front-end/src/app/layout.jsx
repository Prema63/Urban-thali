import './globals.scss';
import {Jost, Roboto,Charm,Oregano} from 'next/font/google';
import Providers from '@/components/provider';
import SuppressHydrationWarning from '@/components/suppress-hydration-warning';
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/gtm/gtm';
import GoogleAnalytics from '@/components/analytics/google-analytics';

export const metadata = {
  title: 'Urban Thali - Order Delicious Food Online',
  description: 'Urban Thali - Fresh and authentic Indian food delivered to your doorstep',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
}

// Move viewport to its own export
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}


const body = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});
const heading = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-heading",
});
const p = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-p",
});
const jost = Jost({
  weight: ["300","400", "500", "600", "700", "800","900"],
  subsets: ["latin"],
  variable: "--tp-ff-jost",
});
const roboto = Roboto({
  weight: ["300","400","500","700","900"],
  subsets: ["latin"],
  variable: "--tp-ff-roboto",
});
const oregano = Oregano({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--tp-ff-oregano",
});
const charm = Charm({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-charm",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body className={`${body.variable} ${heading.variable} ${p.variable} ${jost.variable} ${roboto.variable} ${oregano.variable} ${charm.variable}`} suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <SuppressHydrationWarning />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
