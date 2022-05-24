import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const useSpotifyApi = () => {
  const { data: session } = useSession();
  
  useEffect(() => {
    if (!session) return;

    // if refresh access token attempt fails, direct user to login...
    if (session.error === 'RefreshTokenFailed')
      signIn('spotify', { callbackUrl: '/' });

    spotifyApi.setAccessToken(session.accessToken);
  }, [session, session.accessToken]);

  return spotifyApi;
};

export default useSpotifyApi;
