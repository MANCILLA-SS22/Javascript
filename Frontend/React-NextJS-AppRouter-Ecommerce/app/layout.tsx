import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './assets/styles/globals.css';
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: {
    template: '%s | Prostore',
    default: APP_NAME
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

//                            https://github.com/bradtraversy/prostore/commits/main/?before=14ab015616d6377a223d6da8361eb4ab9b0afc75+140
//                            cd Frontend/React-NextJS-AppRouter-Ecommerce