import { characterInitialData } from "./character.types";
import { episodeInitialData } from "./episode.types";

export type homeProps = {
  characters: characterInitialData[];
  episodes: episodeInitialData[];
};
