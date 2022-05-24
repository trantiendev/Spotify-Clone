import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import { removeDuplicate } from "../utils/removeDuplicate";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RecentlyPlayed, DropDown } from '.';
import useSpotifyApi from '../hooks/useSpotifyApi';

const Right = () => {
  const { data: session } = useSession();
  const { accessToken } = session;
  const spotifyApi = useSpotifyApi();

  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      const recentlyPlayedTracks = res.body.items.map(({ track }) => {
        return {
          id: track.id,
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[0].url,
        };
      })
      const finalRecentlyTrack = removeDuplicate(recentlyPlayedTracks);
      
      setRecentlyPlayed(finalRecentlyTrack);
    });
  }, [accessToken]);

  return (
    <section className="p-4 space-y-8 pr-8">
      <div className="flex space-x-2 items-center justify-between">
        {/* Icons */}
        <div className="flex items-center space-x-4 border-2 border-[#262626] rounded-full h-12 py-3 px-4">
          <HiOutlineShieldCheck className="text-[#CCCCCC] text-xl" />
          <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
          <div>
            <BiBell className="text-[#CCCCCC] text-xl" />
          </div>
        </div>
        {/* Profile */}
        <DropDown />
      </div>

      {/* Recently Played Tracks */}
      <div className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Recently Played</h4>
          <ViewGridIcon className="text-[#686868] h-6" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
          {recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Right;