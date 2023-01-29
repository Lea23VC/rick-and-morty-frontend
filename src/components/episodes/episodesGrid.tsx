import Box from "@mui/material/Box";
import { ResponsiveStyleValue } from "@mui/system";
import { GridSize, GridSpacing } from "@mui/material/Grid";
import Grid from "@mui/material/Unstable_Grid2";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { pagination } from "../../ts/types/info.types";
import { useState as UseState } from "react";

import { episodeInitialData } from "../../ts/types/episode.types";

import EpisodeBox from "../episodes/episodeBox";

import MessageError from "../messages/emptyErrorMessage";

import dynamic from "next/dynamic";

//dynamic imported modal
const EpisodeModal = dynamic(() => import("../episodes/episodeModal"), {
  suspense: true,
});

//dynamic imported pagination
const Pagination = dynamic(() => import("../pagination/pagination"), {
  suspense: true,
});

type episodesGridProp = {
  episodes: episodeInitialData[];
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

export default function episodesGrid({
  episodes,
  info,
  loading = false,
  onPagination,
  xs,
  sm,
  md,
  lg,
  spacing,
}: episodesGridProp) {
  const [currentEpisodeID, setCurrentEpisodeID] = UseState<
    number | undefined
  >();

  const [open, setOpen] = UseState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrentEpisodeID(undefined);
    setOpen(false);
  };

  const [page, setPage] = UseState(1);
  const gridOptions = {
    xs: xs,
    sm: sm,
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
      <Grid container spacing={spacing} className="place-content-center ">
        {episodes.map((episode, index) => (
          <Grid
            {...gridOptions}
            key={index}
            className="relative border  border-light-blue border-solid shadow-main bg-transparent-black p-4 "
          >
            <EpisodeBox
              episode={episode}
              handleOpen={handleOpen}
              setCurrentEpisodeID={setCurrentEpisodeID}
            />
          </Grid>
        ))}
        <EpisodeModal
          open={open}
          handleClose={handleClose}
          episodeID={currentEpisodeID}
        />
      </Grid>
      <Box>
        {episodes.length == 0 && <MessageError message="No episodes..." />}
      </Box>
      {onPagination && info && (
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
