import Box from "@mui/material/Box";
import { ResponsiveStyleValue } from "@mui/system";
import Grid, { GridSize, GridSpacing } from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import { pagination } from "../../ts/types/info.types";
import { useState as UseState } from "react";

import { useRouter as UseRouter } from "next/router";

import Pagination from "../pagination/pagination";
import { episodeInitialData } from "../../ts/types/episode.types";

import EpisodeBox from "../episodes/episodeBox";
import EpisodeModal from "../episodes/episodeModal";

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
  md,
  lg,
  spacing,
}: episodesGridProp) {
  const [currentEpisodeID, setCurrentEpisodeID] = UseState<
    Number | undefined
  >();
  const router = UseRouter();

  const [open, setOpen] = UseState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrentEpisodeID(undefined);
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
        <Grid container spacing={5} className="place-content-center ">
          {episodes.map((episode, index) => (
            <Grid
              item
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
      )}

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
