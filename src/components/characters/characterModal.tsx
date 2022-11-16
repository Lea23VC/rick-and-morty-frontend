import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import CHARACTER_QUERY from "../../Graphql/Queries/Character.graphql";
import { useEffect as UseEffect, useState as UseState } from "react";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { createCharacterInfoArray } from "../../utils/createCharacterInfoArray";
import { character } from "../../ts/types/character.types";

import CharacterContent from "../characters/characterModalContent";

import ModalInfo from "../../components/layouts/modalLayout";
import { episode } from "../../ts/types/episode.types";

type modalProps = {
  open: boolean;
  handleClose: () => void;
  characterID: Number | undefined;
};

export default function characterModal({
  open,
  handleClose,
  characterID,
}: modalProps): JSX.Element {
  const [loadCharacter, { loading, called }] = UseLazyQuery(CHARACTER_QUERY);

  const [characterData, setCharacterData] = UseState<
    character | episode | undefined
  >();
  UseEffect(() => {
    if (open && characterID) {
      loadCharacter({ variables: { id: characterID } })
        .then(({ data }) => {
          console.log(createCharacterInfoArray(data.character));
          setCharacterData(createCharacterInfoArray(data.character));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  return (
    <>
      <ModalInfo
        open={open}
        handleClose={handleClose}
        setData={setCharacterData}
      >
        {loading || !called || characterData == undefined ? (
          <Container className="flex justify-center">
            <CircularProgress />
          </Container>
        ) : (
          <CharacterContent characterData={characterData as character} />
        )}
      </ModalInfo>
    </>
  );
}
