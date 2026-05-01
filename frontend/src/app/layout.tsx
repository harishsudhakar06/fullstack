import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CompareProvider } from "@/context/CompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollegeIQ – Discover Your College",
  description: "Find, compare and choose the best colleges in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${inter.className} bg-gray-50 min-h-full flex flex-col`}>
        <CompareProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
            {children}
          </main>
        </CompareProvider>
      </body>
    </html>
  );
}