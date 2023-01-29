import { SetStateAction } from "react";
import { character } from "../ts/types/character.types";
import { episode } from "../ts/types/episode.types";

export function addRemoveFavorite(
  key: string,
  favorite: boolean,
  data: character | episode,
  setFavorite: (value: SetStateAction<boolean>) => void
) {
  if (typeof window !== "undefined") {
    try {
      var characters: string = localStorage.getItem(key) as string;
      var values = characters ? JSON.parse(characters) : {};
      if (favorite) {
        delete values[data.id];
      } else {
        values[data.id] = {
          id: data.id,
          date: Date.now(),
        };
      }
      localStorage.setItem(key, JSON.stringify(values));
      setFavorite(!favorite);
    } catch (error) {
      console.error(error);
    }
  }
}
