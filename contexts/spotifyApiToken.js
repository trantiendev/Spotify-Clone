import React, { createContext, useContext } from 'react';
import useSpotifyApi from '../hooks/useSpotifyApi';
import { useSession } from 'next-auth/react';

const StateContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const { accessToken } = session;
  const spotifyApi = useSpotifyApi();
  return (
    <StateContext.Provider value={{ spotifyApi, session, accessToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);