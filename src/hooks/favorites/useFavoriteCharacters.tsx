import { useEffect as UseEffect, useState as UseState } from "react";
import { useLoadCharactersByID as UseLoadCharactersByID } from "../loadData/characters/useLoadCharactersByID";

export function useFavoriteCharacters() {
  const [charactersID, setCharactersID] = UseState<string[] | never[]>([]);
  const { characters, loading, called, error } =
    UseLoadCharactersByID(charactersID);
  UseEffect(() => {
    if (typeof window !== "undefined") {
      const char_ids = Object.keys(
        JSON.parse(localStorage.getItem("characters") || "{}")
      );
      console.log("AAAAAAAAAAAAAAAAAAAAA");
      setCharactersID(char_ids);
    }
  }, []);
  return { characters, loading, called, error };
}
