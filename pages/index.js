import Head from 'next/head';
import Image from 'next/image';
import { Dashboard } from '../components';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Spotify - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  );
}
