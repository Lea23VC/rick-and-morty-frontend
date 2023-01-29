import {
  useEffect as UseEffect,
  useState as UseState,
  useMemo as UseMemo,
} from "react";
import { episode } from "../../ts/types/episode.types";
import { character } from "../../ts/types/character.types";

export function useCheckFavorite(key: string, data: character | episode) {
  const [favorite, setFavorite] = UseState(false);

  const isClient = typeof window !== "undefined";
  const values = UseMemo(() => {
    if (!isClient) return {};
    const favorites: string = localStorage.getItem(key) as string;
    return favorites ? JSON.parse(favorites) : {};
  }, []);

  UseEffect(() => {
    if (isClient && values[`${data.id}`]) {
      setFavorite(true);
    }
  }, [isClient, values, data.id]);

  return { favorite, setFavorite };
}
