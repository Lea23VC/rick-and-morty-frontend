import Head from "next/head";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CHARACTERS_QUERY from "./../src/Graphql/Queries/Characters.graphql";
import EPISODES_QUERY from "../src/Graphql/Queries/Episodes.graphql";
import client from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";

import { GetStaticProps } from "next";
import { Suspense } from "react";

import Container from "@mui/material/Container";

import MainTitle from "../src/components/home/mainTitle";

import { homeProps } from "../src/ts/types/props.types";
import { graphqlResponse } from "../src/ts/types/info.types";

//dynamic imports
//only the main title is not dynamic imported
import dynamic from "next/dynamic";

import CharactersGrid from "../src/components/characters/charactersGrid";
// const CharactersGrid = dynamic(
//   () => import("../src/components/characters/charactersGrid"),
//   {
//     suspense: true,
//   }
// );

import EpisodesGrid from "../src/components/episodes/episodesGrid";
// const EpisodesGrid = dynamic(
//   () => import("../src/components/episodes/episodesGrid"),
//   {
//     suspense: true,
//   }
// );
import Button from "../src/components/buttons/yellowButton";

// const Button = dynamic(() => import("../src/components/buttons/yellowButton"), {
//   suspense: true,
// });

import LastFavorites from "../src/components/favorites/lastFavorites";
import PageLayout from "../src/components/layouts/pageLayout";
// const LastFavorites = dynamic(
//   () => import("../src/components/favorites/lastFavorites"),
//   {
//     suspense: true,
//   }
// );

export const getStaticProps: GetStaticProps = async (context) => {
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
};

export default function Home({ characters, episodes }: homeProps): JSX.Element {
  const data = [
    {
      title: "Characters",
      element: (
        <CharactersGrid characters={characters} xs={12} sm={4} md spacing={0} />
      ),
      url: "/characters",
    },

    {
      title: "Episodes",
      element: (
        <EpisodesGrid
          episodes={episodes}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          spacing={0}
        />
      ),
      url: "/episodes",
    },

    {
      title: "Favorites",
      element: <LastFavorites />,
      url: "/favorites",
    },
  ];

  return (
    <PageLayout headTitle="Rick and Morty - Characters and Locations">
      <Container>
        {data.map((value, index) => (
          <Box key={index} className="pt-5 pb-20">
            <Box className="py-4">
              <Link href={value.url}>
                <Typography
                  id="title"
                  className="font-eurostile font-bold text-2xl sm:text-3xl md:text-4xl text-left uppercase text-shadow-main text-white"
                >
                  {value.title}
                </Typography>
              </Link>
            </Box>
            <Box className="py-4">{value.element}</Box>

            <Box className="py-4">
              <Link href={value.url}>
                <Button label={`See ${value.title}`} />
              </Link>
            </Box>
          </Box>
        ))}
      </Container>
    </PageLayout>
  );
}
