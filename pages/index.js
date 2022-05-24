import Head from 'next/head';
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
    <>
      <Head>
        <title>Spotify - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
