//modules
import { useState, useMemo } from "react";

//hooks
import { useLoadCharacter } from "../loadData/characters/useLoadCharacter";
import { useLoadEpisode } from "../loadData/episodes/useLoadEpisode";

//types and interfaces
import { localStorageData } from "../../ts/types/info.types";

export function useLastFavorites() {
  const isClient = typeof window !== "undefined";

  const [lastFavoriteCharacter, setLastFavoriteCharacter] = useState<
    localStorageData | undefined
  >();

  const [lastFavoriteEpisode, setLastFavoriteEpisode] = useState<
    localStorageData | undefined
  >();

  const { data: characterData } = useLoadCharacter(
    true,
    lastFavoriteCharacter?.id
  );

  const { data: episodeData } = useLoadEpisode(true, lastFavoriteEpisode?.id);

  const characterLocalData = useMemo(() => {
    if (!isClient) return {};
    return JSON.parse(localStorage.getItem("characters") || "{}");
  }, [isClient]);

  const episodeLocalData = useMemo(() => {
    if (!isClient) return {};
    return JSON.parse(localStorage.getItem("episodes") || "{}");
  }, [isClient]);

  useMemo(() => {
    const lastChar = getLastFavData(
      Object.values(characterLocalData)
    ) as localStorageData;
    setLastFavoriteCharacter(lastChar);

    const lastEp = getLastFavData(
      Object.values(episodeLocalData)
    ) as localStorageData;
    setLastFavoriteEpisode(lastEp);
  }, [characterLocalData, episodeLocalData]);

  return { characterData, episodeData };
}

function getLastFavData(info: localStorageData[]): localStorageData | null {
  const sortable = info.sort((a, b) => (a.date < b.date ? 1 : -1));

  return sortable[0] ?? null;
}
