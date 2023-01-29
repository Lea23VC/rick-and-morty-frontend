//modules
import { useEffect as UseEffect, useState as UseState } from "react";

//MUI components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//components
import CharacterGrid from "../characters/charactersGrid";
import Button from "../buttons/yellowButton";

//hooks
import { useCheckFavorite } from "../../hooks/favorites/useCheckFavorite";

//types and interfaces
import { episode } from "../../ts/types/episode.types";
import { addRemoveFavorite } from "../../utils/addRemoveFavorite";

export default function EpisodeModalContent({
  episodeData,
}: {
  episodeData: episode;
}) {
  const { favorite, setFavorite } = useCheckFavorite("episodes", episodeData);

  return (
    <Box>
      <Typography
        variant="h1"
        className="font-eurostile font-bold text-light-blue text-3xl pb-2"
      >
        {episodeData.name}
      </Typography>
      {episodeData.info?.map((episode, index) => (
        <Box key={index}>
          <Typography
            className="font-eurostile font-bold text-white inline text-xl"
            variant="body1"
          >
            {episode.label + ": "}
          </Typography>
          <Typography
            className="font-eurostile text-white inline text-xl"
            variant="body1"
          >
            {episode.value as string}
          </Typography>
        </Box>
      ))}
      {episodeData.characters && (
        <Box>
          <Box className="py-4">
            <Typography className="font-eurostile font-bold text-lg sm:text-xl md:text-2xl uppercase text-shadow-main text-white">
              Characters
            </Typography>
          </Box>

          <Grid container>
            <CharacterGrid
              characters={episodeData.characters}
              spacing={0}
              md={2}
              xs={6}
            />
          </Grid>
        </Box>
      )}
      <Box className="pt-5">
        <Button
          onClick={() =>
            addRemoveFavorite("episodes", favorite, episodeData, setFavorite)
          }
          label={!favorite ? "Add to favorites" : "Remove from favorites"}
        />
      </Box>
    </Box>
  );
}
