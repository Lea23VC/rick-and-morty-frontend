import { info } from "./info.types";
import { character, characterInitialData } from "./character.types";

export type episode = {
  name: string;
  id: Number;
  episode: string;
  info?: info[];
  characters?: character[];
};
export type episodeInitialData = {
  __typename: string;
  id: Number;
  name: string;
  air_data: string;
  episode: string;
  created: Date;
  characters?: characterInitialData[];
};
