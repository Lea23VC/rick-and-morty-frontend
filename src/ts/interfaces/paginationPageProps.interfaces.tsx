import { characterInitialData } from "../types/character.types";
import { episodeInitialData } from "../types/episode.types";
import { pagination } from "../types/info.types";

type paginationProp = {
  pagination: pagination;
};

export interface charactersPageProps extends paginationProp {
  characters: characterInitialData[];
}
export interface episodePageProps extends paginationProp {
  episodes: episodeInitialData[];
}
