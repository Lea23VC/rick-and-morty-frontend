import { location } from "./location.types";
import { info } from "./info.types";

export type character = {
  name: string;
  image: string;
  info: info[];
};

export type characterInitialData = {
  __typename: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location: location;
  origin: location;
};

export type charactersResult = {
  characters: character[];
};

export type characterProp = {
  character: character;
};
