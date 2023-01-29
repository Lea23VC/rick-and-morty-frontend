import { SetStateAction } from "react";
import { character } from "../ts/types/character.types";

export default function AddRemoveFavoriteCharacter(
  favorite: boolean,
  characterData: character,
  setFavorite: (value: SetStateAction<boolean>) => void
) {
  if (typeof window !== "undefined") {
    var characters: string = localStorage.getItem("characters") as string;
    var values = characters ? JSON.parse(characters) : new Object();
    if (favorite) {
      delete values[`${characterData.id}`];
    } else {
      values[`${characterData.id}`] = {
        id: characterData.id,
        date: Date.now(),
      };
    }
    localStorage.setItem("characters", JSON.stringify(values));
    setFavorite(!favorite);
  }
}
