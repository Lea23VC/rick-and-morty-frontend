import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import CHARACTER_QUERY from "../../Graphql/Queries/Character.graphql";

import { useEffect as UseEffect, useState as UseState } from "react";

import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { createCharacterInfoArray } from "../../utils/createCharacterInfoArray";
import { character } from "../../ts/types/character.types";

import CharacterContent from "../characters/characterModalContent";

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

  const [characterData, setCharacterData] = UseState<character | undefined>();
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
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setCharacterData(undefined);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 w-[80%] sm:w-[400px] md:w-[800px] bg-transparent-black -translate-y-1/2 -translate-x-1/2 shadow-main border border-light-blue border-solid p-5 sm:p-10">
        {loading || !called || characterData == undefined ? (
          <Container className="flex justify-center">
            <CircularProgress />
          </Container>
        ) : (
          <CharacterContent characterData={characterData} />
        )}
      </Box>
    </Modal>
  );
}
