import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { episode } from "../../ts/types/episode.types";
import CharacterGrid from "../characters/charactersGrid";
import { useEffect as UseEffect, useState as UseState } from "react";
import Button from "../buttons/yellowButton";

type episodeModalContentProps = {
  episodeData: episode;
};

export default function episodeModalContent({
  episodeData,
}: episodeModalContentProps) {
  const [favorite, setFavorite] = UseState(false);
  function addRemoveFavorite() {
    if (typeof window !== "undefined") {
      var episodes: string = localStorage.getItem("episodes") as string;
      var values = episodes ? JSON.parse(episodes) : new Object();

      console.log(values);

      if (favorite) {
        delete values[`${episodeData.id}`];
      } else {
        values[`${episodeData.id}`] = { id: episodeData.id };
      }
      localStorage.setItem("episodes", JSON.stringify(values));
      setFavorite(!favorite);

      // localStorage.removeItem("characters");
    }
  }

  UseEffect(() => {
    if (typeof window !== "undefined") {
      var episodes: string = localStorage.getItem("episodes") as string;
      var values = episodes ? JSON.parse(episodes) : new Object();

      if (values[`${episodeData.id}`]) {
        setFavorite(true);
      }
    }
  }, []);

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
          onClick={addRemoveFavorite}
          label={!favorite ? "Add to favorites" : "Remove from favorites"}
        />
      </Box>
    </Box>
  );
}
