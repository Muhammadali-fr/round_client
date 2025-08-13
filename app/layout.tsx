import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// provider 
import { ReduxProvider } from "./store/ReduxProvider";

// component 
import StoreUser from "./components/StoreUser";

// loader 
import NextTopLoader from 'nextjs-toploader';

// toaster 
import { Toaster } from "react-hot-toast";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Round",
  description: "eCommerce web site created by Muhammadali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <ReduxProvider>
          <StoreUser />
          <Toaster
            position="top-center" // still needed but we’ll override it
            toastOptions={{
              style: {
                background: '#393939ff',
                color: '#fff',
                fontSize: '14px',
                borderRadius: '10px',
                padding: '5px 10px',
              },
            }}

          />
          <NextTopLoader color="#7f22fe" />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
