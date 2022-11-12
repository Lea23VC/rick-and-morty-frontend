import { location } from "./location.types";

export type character = {
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
