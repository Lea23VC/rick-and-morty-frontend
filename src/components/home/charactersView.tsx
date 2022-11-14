import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CharacterBox from "../characters/characterBox";
import CircularProgress from "@mui/material/CircularProgress";
import dynamic from "next/dynamic";

import SearchBar from "../searchBar/searchBar";
import {
  character,
  characterInitialData,
} from "../../ts/types/character.types";
import { pagination } from "../../ts/types/info.types";
import {
  useState as UseState,
  useEffect as UseEffect,
  useRef as UseRef,
} from "react";

import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import CHARACTER_QUERY from "../../Graphql/Queries/Characters.graphql";

import CharacterModal from "../characters/characterModal";

import { useRouter as UseRouter } from "next/router";

// const CharacterModal = dynamic(() => import("../characters/characterModal"), {
//   suspense: true,
// });
type characterViewProps = {
  characters: character[];
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
  characters,
  info,
}: characterViewProps): JSX.Element {
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

  const [currentCharacters, setCurrentCharacters] = UseState(characters);

  const [loadCharacters, { loading, data, error, called, refetch }] =
    UseLazyQuery(CHARACTER_QUERY);

  UseEffect(() => {
    console.log("query variables: ", queryVariables);
    if (
      page != 1 ||
      called ||
      queryVariables.name ||
      Object.keys(router.query).length > 0
    )
      loadCharacters({ variables: queryVariables }).then((data) => {
        const results: character[] = data.data.characters.results;
        setCurrentCharacters(results);
        console.log("Results: ", data.data.characters);
        setPaginationInfo(data.data.characters.info);
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
          Characters
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
          <Grid container spacing={5} className="place-content-center">
            {currentCharacters.map((character, index) => (
              <Grid item xs={6} md={3} lg={2} key={index} className="relative">
                <CharacterBox
                  character={character}
                  handleOpen={handleOpen}
                  setCurrentCharacterID={setCurrentCharacterID}
                />
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
