import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";

import SearchBar from "../searchBar/searchBar";

import { pagination } from "../../ts/types/info.types";
import {
  useState as UseState,
  useEffect as UseEffect,
  useRef as UseRef,
} from "react";

import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import EPISODES_QUERY from "../../Graphql/Queries/Episodes.graphql";

import CharacterModal from "../characters/characterModal";

import { useRouter as UseRouter } from "next/router";

import { episodeInitialData } from "../../ts/types/episode.types";

import EpisodeBox from "../../components/episodes/episodeBox";

// const CharacterModal = dynamic(() => import("../characters/characterModal"), {
//   suspense: true,
// });
type episodesViewProps = {
  episodes: episodeInitialData[];
  info: pagination;
};

type queryVars = {
  withMoreData: boolean;
  page: number;
  name: string;
};

const StyledPagination = styled(Pagination)(({ theme }) => ({
  padding: "20px 0 10px",
  [`& .MuiPaginationItem-text`]: {
    color: "white !important",
    fontFamily: "Eurostile",
    fontSize: 16,
    textShadow: "0 0 7px rgba(99,253,251,0.54)",
  },
  [`& .MuiPaginationItem-ellipsis`]: {
    fontFamily: "Roboto",
  },
}));

export default function charactersView({
  episodes,
  info,
}: episodesViewProps): JSX.Element {
  console.log("episodes: ", episodes);
  const [currentCharacterID, setCurrentCharacterID] = UseState<
    Number | undefined
  >();

  const router = UseRouter();
  console.log("test: ", router.query.name);

  const [open, setOpen] = UseState(false);
  const [paginationInfo, setPaginationInfo] = UseState(info);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrentCharacterID(undefined);
    setOpen(false);
  };

  const [queryVariables, setQueryVariables] = UseState<{
    name?: string;
    page?: number;
    withMoreData: boolean;
  }>({
    withMoreData: false,
  });

  UseEffect(() => {
    if (!router.isReady) return;
    setQueryVariables({ ...queryVariables, ...router.query });
  }, [router.isReady, router.query]);

  const [page, setPage] = UseState(1);

  const [currentEpisodes, setCurrentEpisodes] = UseState(episodes);

  const [loadEpisodes, { loading, data, error, called, refetch }] =
    UseLazyQuery(EPISODES_QUERY);

  UseEffect(() => {
    console.log("query variables: ", queryVariables);
    if (
      page != 1 ||
      called ||
      queryVariables.name ||
      Object.keys(router.query).length > 0
    )
      loadEpisodes({ variables: queryVariables }).then((data) => {
        const results: episodeInitialData[] = data.data.episodes.results;
        setCurrentEpisodes(results);
        console.log("Results: ", results);
        setPaginationInfo(data.data.episodes.info);
      });
  }, [queryVariables]);

  function searchByName(name: string): void {
    console.log("cccc: ", name);
    setQueryVariables({ ...queryVariables, page: 1, name: name });
    setPage(1);
  }

  return (
    <Box className="sm:pt-4 md:pt-8">
      <Box>
        <Typography className="font-eurostile font-bold text-3xl sm:text-4xl md:text-5xl text-center uppercase text-shadow-main text-white">
          Episodes
        </Typography>
      </Box>
      <Box className="p-4 bg-transparent-black m-4">
        <SearchBar onClick={searchByName} label="Enter a character name" />
      </Box>

      <Container className="py-10">
        {loading ? (
          <Box className="min-w-[100vh] ">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container className="place-content-center ">
            {currentEpisodes.map((episode, index) => (
              <Grid
                item
                xs={6}
                md={3}
                lg={3}
                key={index}
                className="relative border border-light-blue shadow-main bg-transparent-black p-4 "
              >
                <EpisodeBox episode={episode} />
              </Grid>
            ))}
          </Grid>
        )}

        <Stack spacing={2} justifyContent="center" alignItems="center">
          <StyledPagination
            count={paginationInfo.pages}
            color="primary"
            defaultPage={1}
            page={page}
            onChange={(e, page) => {
              setPage(page);
              setQueryVariables({ ...queryVariables, page: page });
            }}
          />
        </Stack>
        <CharacterModal
          open={open}
          handleClose={handleClose}
          characterID={currentCharacterID}
        />
      </Container>
    </Box>
  );
}
