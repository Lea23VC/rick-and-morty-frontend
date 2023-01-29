import CHARACTERS_BY_IDS_QUERY from "../../../Graphql/Queries/CharactersByIds.graphql";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { useState as UseState, useEffect as UseEffect } from "react";
import { characterInitialData } from "../../../ts/types/character.types";

export function useLoadCharactersByID(charactersID: string[] | never[]) {
  const [characters, setCharacters] = UseState<characterInitialData[]>([]);
  const [loadCharacters, { error, called, loading }] = UseLazyQuery(
    CHARACTERS_BY_IDS_QUERY
  );

  UseEffect(() => {
    if (charactersID.length > 0)
      loadCharacters({ variables: { ids: charactersID } }).then(({ data }) => {
        const chars =
          data.charactersByIds[0].id != null ? data.charactersByIds : [];
        setCharacters(chars);
      });
    else return;
  }, [charactersID]);

  return { characters, loading, called, error };
}
