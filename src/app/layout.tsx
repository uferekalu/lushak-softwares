import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUSHAK DATA SYSTEMS - Professional Web & App Development",
  description: "Expert software solutions for websites and cross-platform applications. Registered business delivering elegant, powerful digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              maxWidth: "400px",
            },
            success: { style: { background: "#10b981", color: "white" } },
            error: { style: { background: "#ef4444", color: "white" } },
          }}
        />
      </body>
    </html>
  );
}