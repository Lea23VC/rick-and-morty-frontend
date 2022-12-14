import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

import { episodeInitialData } from "../../ts/types/episode.types";

type episodeBoxProps = {
  episode: episodeInitialData;
  handleOpen?: () => void;
  setCurrentEpisodeID?: Dispatch<SetStateAction<Number | undefined>>;
};

export default function episodeBox({
  episode,
  handleOpen,
  setCurrentEpisodeID,
}: episodeBoxProps) {
  return (
    <Box
      className="cursor-pointer"
      onClick={
        handleOpen && setCurrentEpisodeID
          ? () => {
              console.log("episode: ", episode.id);
              setCurrentEpisodeID(episode.id);
              handleOpen();
            }
          : () => {}
      }
    >
      <Typography className="font-eurostile text-sm sm:text-lg md:text-xl text-shadow-main font-bold inline text-white">
        {episode.name}{" "}
      </Typography>
      <Typography
        variant="h1"
        gutterBottom
        className="font-eurostile text-sm sm:text-lg md:text-xl text-shadow-main inline text-white"
      >
        {"(" + episode.episode + ")"}
      </Typography>
    </Box>
  );
}
