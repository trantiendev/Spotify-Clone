import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { playState, playingTrackState } from '../atoms/playerAtom';

const usePlaySong = (track) => {
  const [isPlayed, setIsPlayed] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlaySong = useCallback(() => {
    setPlayingTrack(track);

    if (track.uri === playingTrack.uri) setIsPlayed((played) => !played);
  }, [playingTrack.uri]);

  return { isPlayed, handlePlaySong, playingTrack };
};

export default usePlaySong;
