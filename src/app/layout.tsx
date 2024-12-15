import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-[family-name:var(--font-geist-sans)] antialiased selection:bg-primary",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="mt-16 flex min-h-[calc(100vh-4rem)]">
            <div className="w-full">
              <div className="mx-auto h-full w-full max-w-7xl">{children}</div>
            </div>
          </main>
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
