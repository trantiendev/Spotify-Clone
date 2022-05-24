import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import usePlaySong from "../hooks/usePlaySong";

const Poster = ({ track }) => {
  const { isPlayed, handlePlaySong, playingTrack } = usePlaySong(track);

  return (
    <div
      className="min-w-[240px] h-[340px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
      onClick={handlePlaySong}
    >
      <img
        src={track.albumUrl}
        alt="track albumUrl"
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />

      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
        {track.uri === playingTrack.uri && isPlayed ? (
            <BsFillPauseFill className="text-white text-xl" />
          ) : (
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[15px]">
          <h4 className="font-extrabold truncate w-44">{track.title}</h4>
          <h6>{track.artist}</h6>
        </div>
      </div>
    </div>
  );
}

export default Poster;