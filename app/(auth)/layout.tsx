import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LeftOutlined } from "@ant-design/icons";

import "../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login to expense tracker page",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col p-16 min-h-full h-screen ">
          <Link href={"/"} className="p-8">
            <LeftOutlined />
            <span> Home </span>
          </Link>

          {children}
        </div>
      </body>
    </html>
  );
}
