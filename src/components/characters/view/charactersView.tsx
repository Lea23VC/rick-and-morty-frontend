import Container from "@mui/material/Container";
import { characterInitialData } from "../../../ts/types/character.types";
import { pagination } from "../../../ts/types/info.types";
import { useState as UseState, useEffect as UseEffect } from "react";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import CHARACTER_QUERY from "../../../Graphql/Queries/Characters.graphql";
import ViewLayout from "../../layouts/viewLayout";
import { useRouter as UseRouter } from "next/router";
import CharactersGrid from "../charactersGrid";

type characterViewProps = {
  characters: characterInitialData[];
  info: pagination;
};

export default function charactersView({
  characters,
  info,
}: characterViewProps): JSX.Element {
  const router = UseRouter();

  const [paginationInfo, setPaginationInfo] = UseState(info);

  const [queryVariables, setQueryVariables] = UseState<{
    name?: string;
    page?: number;
    withMoreData: boolean;
  }>({
    withMoreData: false,
  });

  UseEffect(() => {
    if (!router.isReady) return;

    if (router.query.name) {
      setTitle("Searching characters: " + router.query.name + "...");
    } else {
      setTitle("Characters");
    }

    setQueryVariables({ ...queryVariables, ...router.query });
  }, [router.isReady, router.query]);

  const [currentCharacters, setCurrentCharacters] =
    UseState<characterInitialData[]>(characters);

  const [loadCharacters, { loading, error, called }] =
    UseLazyQuery(CHARACTER_QUERY);

  const [page, setPage] = UseState(1);

  const [title, setTitle] = UseState("Characters");

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
    setTitle(
      name != "" ? "Searching characters: " + name + "..." : "Characters"
    );
    setQueryVariables({ ...queryVariables, page: 1, name: name });
    setPage(1);
  }

  function onPagination(page: number): void {
    setQueryVariables({ ...queryVariables, page: page });
    setPage(2);
  }

  return (
    <ViewLayout title={title} searchAction={searchByName}>
      <Container className="py-10">
        <CharactersGrid
          characters={currentCharacters}
          info={paginationInfo}
          onPagination={onPagination}
          loading={loading}
          xs={6}
          md={3}
          lg={2}
          spacing={{ xs: 0, sm: 3, md: 3 }}
        />
      </Container>
    </ViewLayout>
  );
}
