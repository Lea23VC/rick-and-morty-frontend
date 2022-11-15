import Container from "@mui/material/Container";
import { episodeInitialData } from "../../ts/types/episode.types";
import { pagination } from "../../ts/types/info.types";
import { useState as UseState, useEffect as UseEffect } from "react";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import EPISODES_QUERY from "../../Graphql/Queries/Episodes.graphql";
import ViewLayout from "../../components/layouts/viewLayout";
import { useRouter as UseRouter } from "next/router";
import EpisodesGrid from "../../components/episodes/episodesGrid";

type episodesViewProps = {
  episodes: episodeInitialData[];
  info: pagination;
};

export default function charactersView({
  episodes,
  info,
}: episodesViewProps): JSX.Element {
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
    setQueryVariables({ ...queryVariables, ...router.query });
  }, [router.isReady, router.query]);

  const [page, setPage] = UseState(1);

  const [currentEpisodes, setCurrentEpisodes] = UseState(episodes);

  const [loadEpisodes, { loading, error, called }] =
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
        setPaginationInfo(data.data.episodes.info);
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
    <ViewLayout title="Episodes" searchAction={searchByName} loading={loading}>
      <Container className="py-10">
        <EpisodesGrid
          xs={3}
          episodes={currentEpisodes}
          info={paginationInfo}
          loading={loading}
          onPagination={onPagination}
        />
      </Container>
    </ViewLayout>
  );
}
