import { useEffect as UseEffect, useState as UseState } from "react";
import CHARACTER_QUERY from "../Graphql/Queries/Character.graphql";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { character, characterInitialData } from "../ts/types/character.types";
import { createCharacterInfoArray } from "../utils/createCharacterInfoArray";

export function useLoadCharacter(
  open: boolean,
  characterID: number | undefined
) {
  const [characterData, setCharacterData] = UseState<character | undefined>(
    undefined
  );
  const [loadCharacter, { loading, called, data, error }] = UseLazyQuery<{
    character: characterInitialData;
  }>(CHARACTER_QUERY);

  UseEffect(() => {
    if (characterID) {
      loadCharacter({ variables: { id: characterID } });
    }
  }, [characterID]);

  UseEffect(() => {
    if (data && data.character && open) {
      setCharacterData(createCharacterInfoArray(data.character));
    } else return setCharacterData(undefined);
  }, [data, open]);

  return { characterData, loading, called };
}
