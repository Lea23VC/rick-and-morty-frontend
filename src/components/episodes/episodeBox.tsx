//MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//types and interfaces
import { episodeBoxProps } from "../../ts/types/props.types";

export default function episodeBox({
  episode,
  handleOpen,
  setCurrentEpisodeID,
}: episodeBoxProps) {
  return (
    <Box
      className="cursor-pointer"
      onClick={() => {
        setCurrentEpisodeID(episode.id);
        handleOpen();
      }}
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
