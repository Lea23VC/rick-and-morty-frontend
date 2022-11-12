import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { characterProp } from "../../ts/types/character.types";
import { useState as UseState } from "react";

import CharacterModal from "./characterModal";

export default function characterBox({
  character,
}: characterProp): JSX.Element {
  const [open, setOpen] = UseState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    console.log("Close??");
  };

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
      <CharacterModal open={open} handleClose={handleClose} characterID={1} />
      <Box className="" onClick={handleOpen}>
        <Box className="relative w-[100%] aspect-square border border-light-blue shadow-main">
          <Image
            src={character.image}
            alt="img"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </Box>
        <Box className="border border-light-blue shadow-main bg-transparent-black p-2 ">
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
