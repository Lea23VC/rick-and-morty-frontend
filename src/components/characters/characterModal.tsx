import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import CHARACTER_QUERY from "../../Graphql/Queries/Character.graphql";

import { useEffect as UseEffect, useState as UseState } from "react";

import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { createCharacterInfoArray } from "../../utils/createCharacterInfoArray";
import { character } from "../../ts/types/character.types";

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
  console.log("Character ID: ", characterID);
  const [loadCharacter, { loading, data, error, called, refetch }] =
    UseLazyQuery(CHARACTER_QUERY);

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
      <Box className="absolute top-1/2 left-1/2 w-[50vw] bg-transparent-black -translate-y-1/2 -translate-x-1/2 shadow-main border border-light-blue p-10">
        {loading || !called || characterData == undefined ? (
          <Container className="flex justify-center">
            <CircularProgress />
          </Container>
        ) : (
          <Box className="flex relative w-[100%]">
            <Box className="relative  border border-light-blue shadow-main w-2/5 aspect-square ">
              <Image
                src={characterData.image}
                alt="img"
                layout="fill"
                objectFit="contain"
                className="aspect-square"
              />
            </Box>
            <Box className="border border-light-blue shadow-main bg-transparent-black p-4 w-3/5 ">
              <Box className="">
                <Typography
                  variant="h1"
                  className="font-eurostile font-bold text-light-blue text-3xl pb-2"
                >
                  {characterData.name}
                </Typography>

                {characterData.info?.map((character, index) => (
                  <Box key={index}>
                    <Typography
                      className="font-eurostile font-bold text-white inline"
                      variant="body1"
                    >
                      {character.label + ": "}
                    </Typography>
                    <Typography
                      className="font-eurostile text-white inline"
                      variant="body1"
                    >
                      {character.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
