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

import CharactersGrid from "../characters/charactersGrid";
import EpisodesGrid from "../episodes/episodesGrid";
import Grid from "@mui/material/Unstable_Grid2";

import { characterInitialData } from "../../ts/types/character.types";
import { episodeInitialData } from "../../ts/types/episode.types";

export default function favoritesView() {
  const [loadingChapters, setLoadingChapters] = UseState<boolean>(true);
  const [loadingEpisodes, setLoadingEpisodes] = UseState<boolean>(true);

  const [loadCharacters, { error, called }] = UseLazyQuery(
    CHARACTERS_BY_IDS_QUERY
  );
  const [loadEpisodes] = UseLazyQuery(EPISODES_BY_IDS_QUERY);

  const [characters, setCharacters] = UseState<characterInitialData[]>([]);

  const [episodes, setEpisodes] = UseState<episodeInitialData[]>([]);

  UseEffect(() => {
    if (typeof window !== "undefined") {
      const char_ids = Object.keys(
        JSON.parse(localStorage.getItem("characters") || "{}")
      );

      const eps_ids = Object.keys(
        JSON.parse(localStorage.getItem("episodes") || "{}")
      );

      loadCharacters({ variables: { ids: char_ids } }).then(({ data }) => {
        setCharacters(
          data.charactersByIds[0].id != null ? data.charactersByIds : []
        );
        setLoadingChapters(false);
      });

      loadEpisodes({ variables: { ids: eps_ids } }).then(({ data }) => {
        setEpisodes(data.episodesByIds[0].id != null ? data.episodesByIds : []);
        setLoadingEpisodes(false);
      });
    }
  }, []);

  function onSearch(searchValue: string) {
    searchValues(searchValue, characters, setCharacters);
    searchValues(searchValue, episodes, setEpisodes);
  }

  function searchValues(
    searchValue: string,
    values: characterInitialData[] | episodeInitialData[],
    setValue:
      | Dispatch<SetStateAction<characterInitialData[]>>
      | Dispatch<SetStateAction<episodeInitialData[]>>
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
    setValue(filtered as any);
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
          <CharactersGrid
            characters={characters}
            loading={loadingChapters}
            xs={6}
            md={6}
            lg={6}
          />
        </Box>
        <Box className="pt-20 w-[100%] md:w-[50%]">
          <Box className="py-4">
            <Typography className="font-eurostile font-bold text-lg sm:text-xl md:text-2xl uppercase text-shadow-main text-white text-center">
              Episodes
            </Typography>
          </Box>
          <EpisodesGrid
            episodes={episodes}
            loading={loadingEpisodes}
            xs={6}
            md={6}
            lg={6}
          />
        </Box>
      </Box>
    </ViewLayout>
  );
}
