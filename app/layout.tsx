import type { Metadata } from "next";

import "./globals.css";

// provider 
import { ReduxProvider } from "./store/ReduxProvider";

// component 
import StoreUser from "./components/StoreUser";

// loader 
import NextTopLoader from 'nextjs-toploader';

// toaster 
import { Toaster } from "react-hot-toast";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`antialiased`}
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
