import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import CharactersGrid from "../characters/charactersGrid";
import EpisodesGrid from "../episodes/episodesGrid";
import { getLast } from "../../utils/getLastFavorites";
import { useLastFavorites } from "../../hooks/favorites/useLastFavorites";

export default function LastFavorites() {
  const {
    characterData: lastFavoriteCharacter,
    episodeData: lastFavoriteEpisode,
  } = useLastFavorites();

  const content = [
    {
      title: "Last favorite character added",
      data: (
        <CharactersGrid
          characters={
            lastFavoriteCharacter?.character.name
              ? [lastFavoriteCharacter.character]
              : []
          }
          xs
          spacing={0}
        />
      ),
    },
    {
      title: "Last favorite episode added",
      data: (
        <EpisodesGrid
          episodes={
            lastFavoriteEpisode?.episode.name
              ? [lastFavoriteEpisode.episode]
              : []
          }
          xs
          spacing={0}
        />
      ),
    },
  ];

  return (
    <Grid container xs={12} className="gap-20">
      {content.map((item, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <Box>
            <Box className="py-2">
              <Typography
                variant="h3"
                className="font-eurostile font-bold text-light-blue text-2xl md:text-3xl pb-2"
              >
                {item.title}
              </Typography>
            </Box>
            {item.data}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
