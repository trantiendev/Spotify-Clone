import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Poster } from '.';
import useSpotifyApi from '../hooks/useSpotifyApi';

const Body = () => {
  const { data: session } = useSession();
  const { accessToken } = session;
  const spotifyApi = useSpotifyApi();
  
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((data) => {
      setSearchResults(
        data.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((data) => {
      setNewReleases(
        data.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex h-96 p-4 gap-x-4">
          {searchResults.length === 0
            ? newReleases
                .slice(0, 8)
                .map((track) => <Poster key={track.id} track={track} />)
            : searchResults
                .slice(0, 8)
                .map((track) => <Poster key={track.id} track={track} />)}
        </div>
      </div>
    </section>
  );
};
export default Body;
