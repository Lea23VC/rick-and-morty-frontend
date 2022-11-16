import { SetStateAction } from "react";
import { characterInitialData } from "../ts/types/character.types";
import { episodeInitialData } from "../ts/types/episode.types";

export function searchValuesinArray(
  searchValue: string,
  values: characterInitialData[] | episodeInitialData[]
):
  | SetStateAction<episodeInitialData[]>
  | SetStateAction<characterInitialData[]> {
  const filtered = (values as any[])
    .filter(
      (value: characterInitialData | episodeInitialData) =>
        value.name.toLowerCase().includes(searchValue) ||
        value.name.toUpperCase().includes(searchValue)
    )
    .map(
      (filteredName: characterInitialData | episodeInitialData) => filteredName
    ) as characterInitialData[] | episodeInitialData[];
  // setValue(filtered as any);

  return filtered;
}
