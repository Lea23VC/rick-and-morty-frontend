import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { searchValuesinArray } from "./searchValuesInArray";
import { episodeInitialData } from "../ts/types/episode.types";
import { characterInitialData } from "../ts/types/character.types";

export function searchByName(
  setTitle: Dispatch<SetStateAction<string>>,
  name: string,
  label: string,
  router: NextRouter
): void {
  setTitle(name != "" ? `Searching ${label.toLowerCase()}: ${name}...` : label);
  router.push({
    pathname: router.pathname,
    query: { ...router.query, name: name, page: 1 },
  });
}

export function searchFavorites(
  searchValue: string,
  setTitle: Dispatch<SetStateAction<string>>,
  setCurrentEpisodes: Dispatch<
    SetStateAction<episodeInitialData[] | undefined>
  >,
  setCurrentCharacters: Dispatch<
    SetStateAction<characterInitialData[] | undefined>
  >,
  episodes: episodeInitialData[],
  characters: characterInitialData[]
) {
  setTitle(
    searchValue != ""
      ? "Searching favorites: " + searchValue + "..."
      : "Favorites"
  );

  setCurrentEpisodes(
    searchValuesinArray(searchValue.toLowerCase(), episodes) as SetStateAction<
      episodeInitialData[] | undefined
    >
  );
  setCurrentCharacters(
    searchValuesinArray(
      searchValue.toLowerCase(),
      characters
    ) as SetStateAction<characterInitialData[] | undefined>
  );
}
