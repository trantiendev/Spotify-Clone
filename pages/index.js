import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Dashboard, Loader } from '../components';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    }
  });

  if (status === 'loading') return <Loader />

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
