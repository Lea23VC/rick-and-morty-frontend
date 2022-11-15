import { character } from "../ts/types/character.types";
import { episode } from "../ts/types/episode.types";

type propsKey = {
  data: episode | character;
};

export default function getKeyFromType({ data }: propsKey) {}
