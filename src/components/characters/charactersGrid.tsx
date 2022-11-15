import Box from "@mui/material/Box";
import { ResponsiveStyleValue } from "@mui/system";
import Grid, { GridSize, GridSpacing } from "@mui/material/Grid";
import CharacterBox from "../characters/characterBox";
import CircularProgress from "@mui/material/CircularProgress";

import { characterInitialData } from "../../ts/types/character.types";
import { pagination } from "../../ts/types/info.types";
import { useState as UseState } from "react";

import CharacterModal from "../characters/characterModal";

import { useRouter as UseRouter } from "next/router";

import Pagination from "../pagination/pagination";

type charactersGridProp = {
  characters: characterInitialData[];
  info?: pagination;
  loading?: boolean;
  onPagination?: (page: number) => void;
  xs?: boolean | GridSize | undefined;
  sm?: boolean | GridSize | undefined;
  md?: boolean | GridSize | undefined;
  lg?: boolean | GridSize | undefined;
  xl?: boolean | GridSize | undefined;
  spacing?: ResponsiveStyleValue<GridSpacing> | undefined;
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
}: charactersGridProp) {
  const [paginationInfo, setPaginationInfo] = UseState(info);
  const [currentCharacterID, setCurrentCharacterID] = UseState<
    Number | undefined
  >();

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
      {loading ? (
        <Box className="min-w-[100vh] ">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={spacing} className="place-content-center">
          {characters.map((character, index) => (
            <Grid item {...gridOptions} key={index} className="relative">
              <CharacterBox
                character={character}
                handleOpen={handleOpen}
                setCurrentCharacterID={setCurrentCharacterID}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <CharacterModal
        open={open}
        handleClose={handleClose}
        characterID={currentCharacterID}
      />

      {onPagination && paginationInfo && (
        <Pagination
          page={page}
          paginationInfo={paginationInfo}
          onChange={(page) => {
            setPage(page);

            onPagination(page);
          }}
        />
      )}
    </Box>
  );
}
