import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";
import CharacterBox from "../characters/characterBox";
import CircularProgress from "@mui/material/CircularProgress";

import { characterInitialData } from "../../ts/types/character.types";
import { pagination } from "../../ts/types/info.types";
import { useState as UseState, useEffect as UseEffect } from "react";

import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import CHARACTER_QUERY from "../../Graphql/Queries/Characters.graphql";

import CharacterModal from "../characters/characterModal";

import ViewLayout from "../layouts/viewLayout";

import { useRouter as UseRouter } from "next/router";

import Pagination from "../pagination/pagination";

type characterViewProps = {
  characters: characterInitialData[];
  info: pagination;
};

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

  const [currentCharacters, setCurrentCharacters] =
    UseState<characterInitialData[]>(characters);

  const [loadCharacters, { loading, data, error, called, refetch }] =
    UseLazyQuery(CHARACTER_QUERY);

  UseEffect(() => {
    if (
      page != 1 ||
      called ||
      queryVariables.name ||
      Object.keys(router.query).length > 0
    )
      loadCharacters({ variables: queryVariables }).then((data) => {
        const results: characterInitialData[] = data.data.characters.results;
        setCurrentCharacters(results);
        setPaginationInfo(data.data.characters.info);
      });
  }, [queryVariables]);

  function searchByName(name: string): void {
    setQueryVariables({ ...queryVariables, page: 1, name: name });
    setPage(1);
  }

  return (
    <ViewLayout
      title="Characters"
      searchAction={searchByName}
      loading={loading}
    >
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
        <Pagination
          page={page}
          paginationInfo={paginationInfo}
          onChange={(page) => {
            setPage(page);
            setQueryVariables({ ...queryVariables, page: page });
          }}
        />

        <CharacterModal
          open={open}
          handleClose={handleClose}
          characterID={currentCharacterID}
        />
      </Container>
    </ViewLayout>
  );
}
