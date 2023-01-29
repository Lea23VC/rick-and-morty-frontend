import { characterInitialData } from "../types/character.types";
import { episodeInitialData } from "../types/episode.types";
import { pagination } from "../types/info.types";

type graphqlResponse = {
  loading: boolean;
  networkStatus: number;
};

type dataInfo = {
  info: pagination;
};

interface Icharacters extends dataInfo {
  results: characterInitialData[];
}
interface IEpisodes extends dataInfo {
  results: episodeInitialData[];
}

export interface charactersResponse extends graphqlResponse {
  characters: Icharacters;
}
export interface episodeResponse extends graphqlResponse {
  episodes: IEpisodes;
}
