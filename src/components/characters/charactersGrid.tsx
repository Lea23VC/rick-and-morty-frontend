import Box from "@mui/material/Box";
import { ResponsiveStyleValue } from "@mui/system";
import { GridSize, GridSpacing } from "@mui/material/Grid";
import CharacterBox from "../characters/characterBox";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";

import { characterInitialData } from "../../ts/types/character.types";
import { pagination } from "../../ts/types/info.types";
import { useState as UseState } from "react";

import CharacterModal from "../characters/characterModal";

import MessageError from "../../components/messages/emptyErrorMessage";

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
        <Box className="min-w-[100vh] grid items-center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={spacing} className="place-content-center">
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
      )}
      <CharacterModal
        open={open}
        handleClose={handleClose}
        characterID={currentCharacterID}
      />

      {onPagination && paginationInfo && characters.length > 0 && (
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
