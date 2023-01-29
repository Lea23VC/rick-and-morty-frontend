import { useEffect as UseEffect, useState as UseState } from "react";
import { useLoadEpisodesByID as UseLoadEpisodesByID } from "../loadData/episodes/useLoadEpisodesByID";

export function useFavoriteEpisodes() {
  const [episodesID, setEpisodesID] = UseState<string[] | never[]>([]);
  const { episodes, loading, called, error } = UseLoadEpisodesByID(episodesID);
  UseEffect(() => {
    if (typeof window !== "undefined") {
      const episodesID = Object.keys(
        JSON.parse(localStorage.getItem("episodes") || "{}")
      );
      setEpisodesID(episodesID);
    }
  }, []);
  return { episodes, loading, called, error };
}
