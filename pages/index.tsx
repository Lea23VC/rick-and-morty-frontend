import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";

import CHARACTERS_QUERY from "./../src/Graphql/Queries/Characters.graphql";
import client from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";
import MainTitle from "../src/components/home/mainTitle";
import CharacterView from "../src/components/home/charactersView";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import createCharacterInfoArray from "../src/utils/createCharacterInfoArray";

import {
  characterInitialData,
  character,
} from "../src/ts/types/character.types";

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
  characters: character[];
  queryInfo: pagination;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const characters: ApolloQueryResult<graphqlResponse> = await client.query({
    query: CHARACTERS_QUERY,
    variables: { withMoreData: false },
  });
  return {
    props: {
      characters: characters.data.characters.results,
      queryInfo: characters.data.characters.info,
    },
  };
};

export default function Home({
  characters,
  queryInfo,
}: homeProps): JSX.Element {
  console.log("Characters: ?? ", characters);
  console.log("Pagination info: ", queryInfo.count);
  return (
    <div className="bg-main bg-cover">
      <Head>
        <title>Rick and Morty - Characters and Locations</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen max-w-screen-lg m-auto">
        <Box className="pt-12">
          <MainTitle />
          <CharacterView characters={characters} info={queryInfo} />
        </Box>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
