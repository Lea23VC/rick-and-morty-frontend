import { characterInitialData } from "../types/character.types";
import { pagination } from "../types/info.types";

type paginationProp = {
  pagination: pagination;
};

export interface charactersPageProps extends paginationProp {
  characters: characterInitialData[];
}
