import Box from "@mui/material/Box";
import { ResponsiveStyleValue } from "@mui/system";
import { GridSize, GridSpacing } from "@mui/material/Grid";
import CharacterBox from "../characters/characterBox";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import Backdrop from "@mui/material/Backdrop";
import { characterInitialData } from "../../ts/types/character.types";
import { pagination } from "../../ts/types/info.types";
import { useState as UseState } from "react";

import CharacterModal from "../characters/characterModal";

import MessageError from "../../components/messages/emptyErrorMessage";

import Pagination from "../pagination/pagination";

type responsiveSizes = boolean | GridSize | undefined;

type responsiveSpacing = {
  xs?: responsiveSizes;
  sm?: responsiveSizes;
  md?: responsiveSizes;
  lg?: responsiveSizes;
  xl?: responsiveSizes;
};

type charactersGridProp = {
  characters: characterInitialData[];
  info?: pagination;
  loading?: boolean;
  onPagination?: (page: number) => void;
  xs?: responsiveSizes;
  sm?: responsiveSizes;
  md?: responsiveSizes;
  lg?: responsiveSizes;
  xl?: responsiveSizes;
  spacing?: ResponsiveStyleValue<GridSpacing> | undefined;
  columnSpacing?: ResponsiveStyleValue<GridSpacing> | undefined;
};

export default function charactersGrid({
  characters,
  info,
  loading = false,
  onPagination,
  xs,
  md,
  lg,
  spacing = 5,
  columnSpacing,
}: charactersGridProp) {
  const [currentCharacterID, setCurrentCharacterID] = UseState<
    Number | undefined
  >();

  console.log("characters: ", characters);
  const [open, setOpen] = UseState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrentCharacterID(undefined);
    setOpen(false);
  };

  const [page, setPage] = UseState(1);
  const gridOptions = {
    xs: xs,
    md: md,
    lg: lg,
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
            <Grid {...gridOptions} key={index} className="relative">
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

      {onPagination && info && characters.length > 0 && (
        <Pagination
          page={page}
          paginationInfo={info}
          onChange={(page) => {
            setPage(page);

            onPagination(page);
          }}
        />
      )}
    </Box>
  );
}
