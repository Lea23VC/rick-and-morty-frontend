import Head from "next/head";
import Box from "@mui/material/Box";

import EPISODES_QUERY from "./../src/Graphql/Queries/Episodes.graphql";
import client from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";

import { pagination } from "../src/ts/types/info.types";

import { episodeInitialData } from "../src/ts/types/episode.types";

import MainTitle from "../src/components/home/mainTitle";

import dynamic from "next/dynamic";
import PageLayout from "../src/components/layouts/pageLayout";

const EpisodesView = dynamic(
  () => import("../src/components/episodes/view/episodesView"),
  {
    suspense: true,
  }
);

type graphqlResponse = {
  episodes: {
    results: episodeInitialData[];
    info: pagination;
  };

  loading: boolean;
  network: number;
};

type homeProps = {
  episodes: episodeInitialData[];
  queryInfo: pagination;
};

export async function getServerSideProps({ query }: any) {
  const episodes: ApolloQueryResult<graphqlResponse> = await client.query({
    query: EPISODES_QUERY,
    variables: {
      withMoreData: false,
      page: parseInt(query.page),
      name: query.name || null,
    },
  });

  console.log("episodes: ", episodes);
  return {
    props: {
      episodes: episodes.data.episodes.results,
      queryInfo: episodes.data.episodes.info,
    },
  };
}

export default function EpisodePage({
  episodes,
  queryInfo,
}: homeProps): JSX.Element {
  return (
    <PageLayout headTitle="Episodes - Rick and Morty">
      <EpisodesView episodes={episodes} info={queryInfo} />
    </PageLayout>
  );
}
