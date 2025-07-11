import { useState } from 'react';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';
import 'tailwindcss/tailwind.css';
import { CartProvider } from '../components/cart/context/cartContext';

export default function App({ Component, pageProps, err }: AppProps & { err: Error }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-C9MMBP55Y7`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C9MMBP55Y7', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CartProvider>
              <Component {...pageProps} err={err} />
            </CartProvider>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
