import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PublicNavbar from "../components/public_navbar";
import DashboardNavbar from "../components/ui/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gamma-Ray Blast",
  description: "CAPSTONE 2 WEBSITE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyStyle = inter.className;

  return (
    <html lang="en" className={"!overflow-y-auto !p-0"}>
      <head>
        <meta name="google-site-verification" content="c-cubwLfO2cj1DDdT0tkUIv7IszeckNwDlEMx2VZMtI" />
      </head>
      <body className={`${bodyStyle} text-black`}>
        {children}
      </body>
    </html>
  );
}


/* how to use layout.tsx to use shared components across pages ysing layouts 
    and routing files*/