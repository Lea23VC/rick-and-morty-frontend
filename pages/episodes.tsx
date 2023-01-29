//modules
import client from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import dynamic from "next/dynamic";

//layouts
import PageLayout from "../src/components/layouts/pageLayout";

//queries
import EPISODES_QUERY from "./../src/Graphql/Queries/Episodes.graphql";

//types and interfaces
import { episodeResponse } from "../src/ts/interfaces/graphqlResponse.interfaces";
import { episodePageProps } from "../src/ts/interfaces/paginationPageProps.interfaces";

const EpisodesView = dynamic(
  () => import("../src/components/episodes/view/episodesView"),
  {
    suspense: true,
  }
);

export async function getServerSideProps({ query }: any) {
  const episodes: ApolloQueryResult<episodeResponse> = await client.query({
    query: EPISODES_QUERY,
    variables: {
      withMoreData: false,
      page: parseInt(query.page),
      name: query.name || null,
    },
  });

  return {
    props: {
      episodes: episodes.data.episodes.results,
      pagination: episodes.data.episodes.info,
    },
  };
}

export default function EpisodePage({
  episodes,
  pagination,
}: episodePageProps): JSX.Element {
  return (
    <PageLayout headTitle="Episodes - Rick and Morty">
      <EpisodesView episodes={episodes} info={pagination} />
    </PageLayout>
  );
}
