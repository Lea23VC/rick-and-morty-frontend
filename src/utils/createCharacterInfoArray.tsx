import { characterInitialData, character } from "../ts/types/character.types";
import { info } from "../ts/types/info.types";
export default function createCharactersInfoArray(
  data: characterInitialData[]
) {
  return data.map((character, index) => {
    var character_data: info[] = [];

    character_data = [
      { label: "Status", value: character.status },
      { label: "Species", value: character.species },
      { label: "Gender", value: character.gender },
      { label: "Last known location", value: character.location.name },
      { label: "First seen in", value: character.origin.name },
    ];

    return {
      id: character.id,
      name: character.name,
      image: character.image,
      info: character_data,
      location: character.location,
      origin: character.origin,
    };
  });
}

export function createCharacterInfoArray(
  character: characterInitialData
): character {
  var character_data: info[] = [];

  character_data = [
    { label: "Status", value: character.status },
    { label: "Species", value: character.species },
    { label: "Gender", value: character.gender },
    { label: "Last known location", value: character.location.name },
    { label: "First seen in", value: character.origin.name },
  ];

  return {
    name: character.name,
    image: character.image,
    info: character_data,
    id: character.id,
  };
}
