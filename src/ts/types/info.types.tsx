import { characterInitialData } from "./character.types";
import { episodeInitialData } from "./episode.types";

export type info = {
  label: string;
  value: string | Date;
};

export type pagination = {
  count: number;
  pages: number;
  next?: number;
  prev?: number;
};

export type paginationInfoArray = {
  info: pagination[];
};

export type paginationInfo = {
  info: pagination;
};

export type localStorageData = {
  id: number;
  date: Date;
};
export type dataFetched = {
  results: characterInitialData[] | episodeInitialData[];
  info: pagination;
};
export type graphqlResponse = {
  characters?: dataFetched;
  episodes?: dataFetched;

  loading: boolean;
  network: number;
};
