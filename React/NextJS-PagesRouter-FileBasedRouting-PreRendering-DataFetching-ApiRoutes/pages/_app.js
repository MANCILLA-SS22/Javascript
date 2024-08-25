import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
    <Layout>
      <Head>
        <title>Next events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-wdth" />
      </Head>
      <Component {...pageProps} />
    </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;