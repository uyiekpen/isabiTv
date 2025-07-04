import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProviderSafe } from "@/components/auth-provider-safe";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "isabiTv - Share Your Story",
  description:
    "A platform for creators to share videos and participate in contests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
        <AuthProviderSafe>
          {children}
          <Toaster />
        </AuthProviderSafe>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
