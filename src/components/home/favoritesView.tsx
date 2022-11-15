import ViewLayout from "../layouts/viewLayout";
import {
  Dispatch,
  SetStateAction,
  useEffect as UseEffect,
  useState as UseState,
} from "react";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import CHARACTERS_BY_IDS_QUERY from "../../Graphql/Queries/CharactersByIds.graphql";
import EPISODES_BY_IDS_QUERY from "../../Graphql/Queries/EpisodesByIds.graphql";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import CharactersGrid from "../characters/charactersGrid";
import EpisodesGrid from "../episodes/episodesGrid";
import Grid from "@mui/material/Unstable_Grid2";

import { characterInitialData } from "../../ts/types/character.types";
import { episodeInitialData } from "../../ts/types/episode.types";

import { searchValuesinArray } from "../../utils/searchValuesInArray";

export default function favoritesView() {
  const [loadingChapters, setLoadingChapters] = UseState<boolean>(true);
  const [loadingEpisodes, setLoadingEpisodes] = UseState<boolean>(true);

  const [loadCharacters, { error, called }] = UseLazyQuery(
    CHARACTERS_BY_IDS_QUERY
  );
  const [loadEpisodes] = UseLazyQuery(EPISODES_BY_IDS_QUERY);

  const [characters, setCharacters] = UseState<characterInitialData[]>([]);
  const [currentCharacters, setCurrentCharacters] = UseState<
    characterInitialData[]
  >([]);

  const [episodes, setEpisodes] = UseState<episodeInitialData[]>([]);
  const [currentEpisodes, setCurrentEpisodes] = UseState<episodeInitialData[]>(
    []
  );

  UseEffect(() => {
    if (typeof window !== "undefined") {
      const char_ids = Object.keys(
        JSON.parse(localStorage.getItem("characters") || "{}")
      );
      const eps_ids = Object.keys(
        JSON.parse(localStorage.getItem("episodes") || "{}")
      );
      loadCharacters({ variables: { ids: char_ids } }).then(({ data }) => {
        const chars =
          data.charactersByIds[0].id != null ? data.charactersByIds : [];
        setCharacters(chars);
        setCurrentCharacters(chars);
        setLoadingChapters(false);
      });

      loadEpisodes({ variables: { ids: eps_ids } }).then(({ data }) => {
        const eps = data.episodesByIds[0].id != null ? data.episodesByIds : [];
        setCurrentEpisodes(eps);
        setEpisodes(eps);
        setLoadingEpisodes(false);
      });
    }
  }, []);

  function onSearch(searchValue: string) {
    setCurrentEpisodes(
      searchValuesinArray(searchValue, episodes) as SetStateAction<
        episodeInitialData[]
      >
    );
    setCurrentCharacters(
      searchValuesinArray(searchValue, characters) as SetStateAction<
        characterInitialData[]
      >
    );
  }

  function searchValues(
    searchValue: string,
    values: characterInitialData[] | episodeInitialData[]
  ) {
    const filtered = (values as any[])
      .filter(
        (value: characterInitialData | episodeInitialData) =>
          value.name.toLowerCase().includes(searchValue) ||
          value.name.toUpperCase().includes(searchValue)
      )
      .map(
        (filteredName: characterInitialData | episodeInitialData) =>
          filteredName
      ) as characterInitialData[] | episodeInitialData[];
    // setValue(filtered as any);

    return filtered;
  }

  return (
    <ViewLayout title="Favorites" searchAction={onSearch}>
      <Box className="flex flex-col md:flex-row gap-10">
        <Box className="pt-20 w-[100%] md:w-[50%]">
          <Box className="py-4">
            <Typography className="font-eurostile font-bold text-lg sm:text-xl md:text-2xl uppercase text-shadow-main text-white text-center">
              Characters
            </Typography>
          </Box>
          <Container>
            <CharactersGrid
              characters={currentCharacters}
              loading={loadingChapters}
              xs={6}
              md={6}
              lg={6}
              spacing={{ xs: 2, sm: 2, md: 2 }}
            />
          </Container>
        </Box>
        <Box className="pt-20 w-[100%] md:w-[50%]">
          <Box className="py-4">
            <Typography className="font-eurostile font-bold text-lg sm:text-xl md:text-2xl uppercase text-shadow-main text-white text-center">
              Episodes
            </Typography>
          </Box>
          <Container>
            <EpisodesGrid
              episodes={currentEpisodes}
              loading={loadingEpisodes}
              xs={12}
              md={12}
              lg={12}
            />
          </Container>
        </Box>
      </Box>
    </ViewLayout>
  );
}
