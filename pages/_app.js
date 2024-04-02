import { useEffect } from 'react';
import Head from 'next/head';
import '../global.css';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add any global JavaScript or initialization code here if needed.
  }, []);

  return (
    <main>
      <Head>
        {/* Set the favicon using the link element */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* You can also set other metadata here, like the title, meta tags, etc. */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

export default MyApp;
