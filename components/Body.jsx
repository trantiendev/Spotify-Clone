import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Poster, Track } from '.';
import useSpotifyApi from '../hooks/useSpotifyApi';
import { useStateContext } from '../contexts/spotifyApiToken';

const Body = () => {
  const { data: session } = useSession();
  const { accessToken } = session;
  const spotifyApi = useSpotifyApi();
  // const { spotifyApi, accessToken } = useStateContext();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
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

    return () => (cancel = true);
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
    }, (err) => {
      console.log("Something went wrong!", err);
    });
  }, [accessToken]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="overflow-x-scroll scrollbar-hide max-w-[1150px]">
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
      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* Genres */}
        <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
            All Genres
          </button>
        </div>

        {/* Tracks */}
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
    
  );
};
export default Body;
