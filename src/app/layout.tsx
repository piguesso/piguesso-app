import type { Metadata } from "next";
import { Sono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { twMerge } from "tailwind-merge";
import NavBar from "@/components/navigation/nav-bar";
import Script from "next/script";
import DynamicIsland from "@/components/navigation/nav-bar";
import { ClerkProvider, currentUser, SignIn } from "@clerk/nextjs";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/user";

const sono = Sono({ subsets: ["latin"] });

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={twMerge(
          "h-full w-full overflow-y-scroll bg-background",
          sono.className,
          roboto.className
        )}
      >
        <body className={"h-full w-full bg-background overflow-y-scroll"}>
          <Script
            src="https://kit.fontawesome.com/7dfc9e0334.js"
            crossOrigin="anonymous"
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
