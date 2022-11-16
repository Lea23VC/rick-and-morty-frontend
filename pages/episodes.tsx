import Head from "next/head";
import Box from "@mui/material/Box";

import EPISODES_QUERY from "./../src/Graphql/Queries/Episodes.graphql";
import client from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import MainTitle from "../src/components/home/mainTitle";
import EpisodesView from "../src/components/episodes/view/episodesView";
import { GetStaticProps } from "next";

import { pagination } from "../src/ts/types/info.types";

import { episodeInitialData, episode } from "../src/ts/types/episode.types";

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

export async function getStaticProps() {
  const episodes: ApolloQueryResult<graphqlResponse> = await client.query({
    query: EPISODES_QUERY,
    variables: { withMoreData: false },
  });

  console.log("episodes: ", episodes);
  return {
    props: {
      episodes: episodes.data.episodes.results,
      queryInfo: episodes.data.episodes.info,
    },
  };
}

export default function Home({ episodes, queryInfo }: homeProps): JSX.Element {
  return (
    <div className="bg-main bg-cover">
      <Head>
        <title>Episodes - Rick and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen max-w-screen-lg m-auto">
        <Box className="py-32">
          <MainTitle />
          <EpisodesView episodes={episodes} info={queryInfo} />
        </Box>
      </main>
    </div>
  );
}
