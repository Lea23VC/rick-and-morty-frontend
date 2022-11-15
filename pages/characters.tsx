import Head from "next/head";
import Box from "@mui/material/Box";

import CHARACTERS_QUERY from "./../src/Graphql/Queries/Characters.graphql";
import client from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import MainTitle from "../src/components/home/mainTitle";
import CharacterView from "../src/components/home/charactersView";

import { characterInitialData } from "../src/ts/types/character.types";

import { pagination } from "../src/ts/types/info.types";

type graphqlResponse = {
  characters: {
    results: characterInitialData[];
    info: pagination;
  };

  loading: boolean;
  network: number;
};

type homeProps = {
  characters: characterInitialData[];
  queryInfo: pagination;
};

Characters.getInitialProps = async (ctx: any) => {
  const characters: ApolloQueryResult<graphqlResponse> = await client.query({
    query: CHARACTERS_QUERY,
    variables: { withMoreData: false },
  });
  return {
    characters: characters.data.characters.results,
    queryInfo: characters.data.characters.info,
  };
};

export default function Characters({
  characters,
  queryInfo,
}: homeProps): JSX.Element {
  return (
    <div className="bg-main bg-cover">
      <Head>
        <title>Chracters - Rick and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen max-w-screen-lg m-auto">
        <Box className="py-32">
          <MainTitle />
          <CharacterView characters={characters} info={queryInfo} />
        </Box>
      </main>
    </div>
  );
}
