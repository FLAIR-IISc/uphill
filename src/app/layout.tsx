import "./globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import ReactGA from "react-ga4";

ReactGA.initialize("G-9CQYSNQGVD");

export const metadata: Metadata = {
  title: "Evaluating Large Language Models for Health-related Queries with Presuppositions",
  description: "", // #TODO
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
