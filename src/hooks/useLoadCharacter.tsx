//modules
import { useEffect as UseEffect, useState as UseState } from "react";

//hooks
import { useLazyQuery as UseLazyQuery } from "@apollo/client";

//queries
import CHARACTER_QUERY from "../Graphql/Queries/Character.graphql";

//utils
import { createCharacterInfoArray } from "../utils/createCharacterInfoArray";

//types and interfaces
import { character, characterInitialData } from "../ts/types/character.types";

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
