//modules
import { useState as UseState } from "react";

//MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

//components
import CharactersGrid from "../../characters/charactersGrid";
import EpisodesGrid from "../../episodes/episodesGrid";

//layouts
import ViewLayout from "../../layouts/viewLayout";

//hooks
import { useFavoriteCharacters as UseFavoriteCharacters } from "../../../hooks/favorites/useFavoriteCharacters";
import { useFavoriteEpisodes as UseFavoriteEpisodes } from "../../../hooks/favorites/useFavoriteEpisodes";

//utils
import { searchFavorites } from "../../../utils/searchByName";

//types and interfaces
import { characterInitialData } from "../../../ts/types/character.types";
import { episodeInitialData } from "../../../ts/types/episode.types";

export default function favoritesView() {
  const { characters, loading: loadingCharacters } = UseFavoriteCharacters();
  const { episodes, loading: loadingEpisodes } = UseFavoriteEpisodes();

  const [currentCharacters, setCurrentCharacters] = UseState<
    characterInitialData[] | undefined
  >(undefined);

  const [currentEpisodes, setCurrentEpisodes] = UseState<
    episodeInitialData[] | undefined
  >(undefined);

  const [title, setTitle] = UseState("Favorites");

  const data = [
    {
      title: "Characters",
      content: (
        <CharactersGrid
          characters={currentCharacters ?? characters}
          loading={loadingCharacters}
          xs={6}
          md={6}
          lg={6}
          spacing={{ xs: 2, sm: 2, md: 2 }}
        />
      ),
    },

    {
      title: "Episodes",
      content: (
        <EpisodesGrid
          episodes={currentEpisodes ?? episodes}
          loading={loadingEpisodes}
          xs={12}
          md={12}
          lg={12}
        />
      ),
    },
  ];

  return (
    <ViewLayout
      title={title}
      searchAction={(e) =>
        searchFavorites(
          e,
          setTitle,
          setCurrentEpisodes,
          setCurrentCharacters,
          episodes,
          characters
        )
      }
    >
      <Box className="flex flex-col md:flex-row gap-10">
        {data.map((value, index) => (
          <Box className="pt-10 w-[100%] md:w-[50%]" key={index}>
            <Box className="py-4">
              <Typography className="font-eurostile font-bold text-lg sm:text-xl md:text-2xl uppercase text-shadow-main text-white text-center">
                {value.title}
              </Typography>
            </Box>
            <Container>{value.content}</Container>
          </Box>
        ))}
      </Box>
    </ViewLayout>
  );
}
