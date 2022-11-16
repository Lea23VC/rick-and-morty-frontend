import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

import Typography from "@mui/material/Typography";
import Image from "next/image";

import { character } from "../../ts/types/character.types";
import { Dispatch, SetStateAction, useState as UseState } from "react";

type characterBoxProps = {
  character: character;
  handleOpen: () => void;
  setCurrentCharacterID: Dispatch<SetStateAction<Number | undefined>>;
};

export default function characterBox({
  character,
  handleOpen,
  setCurrentCharacterID,
}: characterBoxProps): JSX.Element {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Box
        className="cursor-pointer"
        onClick={() => {
          console.log("char: ", character.id);
          setCurrentCharacterID(character.id);
          handleOpen();
        }}
      >
        <Box className="relative aspect-square border border-light-blue border-solid shadow-main">
          <Image
            src={character.image}
            alt="img"
            className="object-cover w-[100%]"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </Box>
        <Box className="border border-light-blue border-solid shadow-main bg-transparent-black p-2 ">
          <Box>
            <Typography
              variant="h1"
              className="font-eurostile font-bold text-light-blue text-sm text-center"
            >
              {character.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
