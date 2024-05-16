'use client'

import { Inter } from "next/font/google";
import "../globals.css";
import PublicNavbar from "@/components/public_navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });



export default function UnauthorisedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyStyle = inter.className// + "min-h-screen bg-custom-image bg-no-repeat bg-cover bg-center bg-fixed  text-center h-full w-full flex flex-col overflow-hidden";
  const filePath: (string | null) = usePathname();

  return (
    <html lang="en" className={"!overflow-y-auto !p-0"}>
      <body className={bodyStyle}>
        <div
          className={
            filePath === "/"
              ?
              "bg-black"
              :
              "min-h-screen bg-header bg-no-repeat bg-cover bg-center bg-fixed my-0 mx-0 text-center h-max w-full flex flex-col"
          }
        >
          <PublicNavbar></PublicNavbar>
          {children}
        </div>
      </body>
    </html>
  );
}