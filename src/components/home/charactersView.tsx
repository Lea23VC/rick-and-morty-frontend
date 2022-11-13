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
// const CharacterModal = dynamic(() => import("../characters/characterModal"), {
//   suspense: true,
// });
type characterViewProps = {
  characters: character[];
  info: pagination;
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
  const [open, setOpen] = UseState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCurrentCharacterID(undefined);
    setOpen(false);
    console.log("Close??");
  };

  const [page, setPage] = UseState(1);
  console.log("Page: ", page);
  const [currentCharacters, setCurrentCharacters] = UseState(characters);

  const [loadCharacters, { loading, data, error, called, refetch }] =
    UseLazyQuery(CHARACTER_QUERY);

  UseEffect(() => {
    if (page != 1 || called)
      loadCharacters({ variables: { page: page, withMoreData: false } }).then(
        (data) => {
          const results: character[] = data.data.characters.results;
          setCurrentCharacters(results);
          console.log("Results: ", data.data.characters);
        }
      );
  }, [page]);

  return (
    <Box className="sm:pt-4 md:pt-8">
      <Box>
        <Typography className="font-eurostile font-bold text-3xl sm:text-4xl md:text-5xl text-center uppercase text-shadow-main text-white">
          Characters
        </Typography>
      </Box>
      <Container className="py-10">
        {loading ? (
          <Box className="min-w-[100vh] ">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={5} className="place-content-center">
            {currentCharacters.map((character, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                key={index}
                className="relative"
              >
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
            count={info.pages}
            color="primary"
            defaultPage={1}
            page={page}
            onChange={(e, page) => {
              setPage(page);
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
