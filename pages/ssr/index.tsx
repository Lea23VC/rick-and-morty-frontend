import CHARACTERS_QUERY from "./../../src/Graphql/Queries/Characters.graphql";
import EPISODES_QUERY from "../../src/Graphql/Queries/Episodes.graphql";
import client from "../../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import { graphqlResponse } from "../../src/ts/types/info.types";
import { homeProps } from "../../src/ts/types/props.types";

export async function getServerSideProps() {
  const characters: ApolloQueryResult<graphqlResponse> = await client.query({
    query: CHARACTERS_QUERY,
    variables: { withMoreData: false },
  });

  const episodes: ApolloQueryResult<graphqlResponse> = await client.query({
    query: EPISODES_QUERY,
    variables: { withMoreData: false },
  });

  return {
    props: {
      characters: characters.data.characters?.results.slice(0, 5),
      episodes: episodes.data.episodes?.results.slice(0, 11),
    },
  };
}

import Index from "../index";
export default function indexSSR({ characters, episodes }: homeProps) {
  return <Index characters={characters} episodes={episodes} />;
}
