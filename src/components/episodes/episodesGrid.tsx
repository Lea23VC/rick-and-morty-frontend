//modules
import { useState as UseState } from "react";
import dynamic from "next/dynamic";

//MUI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

//components
import EpisodeBox from "../episodes/episodeBox";
import MessageError from "../messages/emptyErrorMessage";

//dynamic imported modal
const EpisodeModal = dynamic(() => import("../episodes/episodeModal"), {
  suspense: true,
});

//utils
import { gridOptions } from "../../utils/gridOptions";

//types and interfaces
import { episodesGridProp } from "../../ts/types/props.types";

export default function episodesGrid({
  episodes,
  loading = false,
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
            {...gridOptions(xs, sm, md, lg)}
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
          dataID={currentEpisodeID}
        />
      </Grid>
      <Box>
        {episodes.length == 0 && <MessageError message="No episodes..." />}
      </Box>
    </Box>
  );
}
