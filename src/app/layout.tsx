import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "./clientwrapper";
import Favicon from "../../public/favicon.png";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saikhom Tutors",
  description:
    "North-East India's most affordable coaching centre for JEE and NEET",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientWrapper>{children}</ClientWrapper>
        <Toaster />
      </body>
    </html>
  );
}
