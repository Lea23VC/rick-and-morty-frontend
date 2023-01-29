import { location } from "./location.types";
import { info } from "./info.types";

export type character = {
  name: string;
  image: string;
  id: number;
  info?: info[];
};

export type characterInitialData = {
  __typename: string;
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location: location;
  origin: location;
};

export type characterProp = {
  character: character;
};
