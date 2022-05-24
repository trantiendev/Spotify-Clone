import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useRecoilState, useRecoilValue } from "recoil";
import { playState, playingTrackState } from "../atoms/playerAtom";
import { useSession } from "next-auth/react";

const Player = () => {
  const { data: session } = useSession();
  const { accessToken } = session;
  
  const [play, setPlay] = useRecoilState(playState);
  const playingTrack = useRecoilValue(playingTrackState);
  const trackUri = playingTrack?.uri

  useEffect(() => {
    trackUri && setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <>
      {/* Premium Users */}
      <SpotifyPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "#181818",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "70px",
          sliderTrackColor: "#535353",
          sliderTrackBorderRadius: "4px",
          sliderHandleColor: "#fff",
          errorColor: "#fff",
        }}
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          setPlay(state.isPlaying);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        magnifySliderOnHover={true}
        autoPlay={true}
      />
    </>
  );
}

export default Player;
