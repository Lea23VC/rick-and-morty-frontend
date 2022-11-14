import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { episodeInitialData } from "../../ts/types/episode.types";

type episodeBoxProps = {
  episode: episodeInitialData;
};

export default function episodeBox({ episode }: episodeBoxProps) {
  return (
    <Box className="">
      <Typography className="font-eurostile text-sm sm:text-lg md:text-xl text-shadow-main font-bold inline">
        {episode.name}{" "}
      </Typography>
      <Typography
        variant="h1"
        gutterBottom
        className="font-eurostile text-sm sm:text-lg md:text-xl text-shadow-main inline"
      >
        {"(" + episode.episode + ")"}
      </Typography>
    </Box>
  );
}
