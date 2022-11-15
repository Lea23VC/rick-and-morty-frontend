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

import CharactersGrid from "../../components/characters/charactersGrid";

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

  const [currentCharacters, setCurrentCharacters] =
    UseState<characterInitialData[]>(characters);

  const [loadCharacters, { loading, data, error, called, refetch }] =
    UseLazyQuery(CHARACTER_QUERY);

  const [page, setPage] = UseState(1);

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

  function onPagination(page: number): void {
    setQueryVariables({ ...queryVariables, page: page });
    setPage(2);
  }

  return (
    <ViewLayout
      title="Characters"
      searchAction={searchByName}
      loading={loading}
    >
      <Container className="py-10">
        <CharactersGrid
          characters={currentCharacters}
          info={info}
          loading={loading}
          onPagination={onPagination}
        />
      </Container>
    </ViewLayout>
  );
}
