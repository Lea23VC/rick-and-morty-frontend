import { characterInitialData } from "../types/character.types";
import { pagination } from "../types/info.types";

type graphqlResponse = {
  loading: boolean;
  networkStatus: number;
};

export interface charactersResponse extends graphqlResponse {
  characters: {
    results: characterInitialData[];
    info: pagination;
  };
}
