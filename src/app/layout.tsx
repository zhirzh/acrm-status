import "@/globals.css";
import { cx } from "@/utils";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cx(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "bg-gray-100",
        )}
      >
        {children}
      </body>
    </html>
  );
}
