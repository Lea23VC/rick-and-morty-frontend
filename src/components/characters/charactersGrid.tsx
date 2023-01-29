//modules
import { useState as UseState } from "react";
import dynamic from "next/dynamic";

//MUI components
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import Backdrop from "@mui/material/Backdrop";

//components
import CharacterBox from "../characters/characterBox";
import MessageError from "../../components/messages/emptyErrorMessage";

//dynamic components
const CharacterModal = dynamic(() => import("../characters/characterModal"), {
  suspense: true,
});

//types and interfaces
import { charactersGridProp } from "../../ts/types/props.types";
import { gridOptions } from "../../utils/gridOptions";

export default function charactersGrid({
  characters,
  loading = false,
  xs,
  sm,
  md,
  lg,
  spacing = 5,
  columnSpacing,
}: charactersGridProp) {
  const [currentCharacterID, setCurrentCharacterID] = UseState<
    number | undefined
  >();

  const [open, setOpen] = UseState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrentCharacterID(undefined);
    setOpen(false);
  };

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <Grid container spacing={spacing} columnSpacing={columnSpacing}>
          {characters.map((character, index) => (
            <Grid
              {...gridOptions(xs, sm, md, lg)}
              key={index}
              className="relative"
            >
              <CharacterBox
                character={character}
                handleOpen={handleOpen}
                setCurrentCharacterID={setCurrentCharacterID}
              />
            </Grid>
          ))}
        </Grid>
        <Box>
          {characters.length == 0 && (
            <MessageError message="No characters..." />
          )}
        </Box>
      </Box>

      <CharacterModal
        open={open}
        handleClose={handleClose}
        characterID={currentCharacterID}
      />
    </Box>
  );
}
