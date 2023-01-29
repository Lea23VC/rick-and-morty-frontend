//imports modules and files
import client from "../apollo-client";
import { ApolloQueryResult } from "@apollo/client";

//views
import CharacterView from "../src/components/characters/view/charactersView";

//layouts
import PageLayout from "../src/components/layouts/pageLayout";

//queries
import CHARACTERS_QUERY from "./../src/Graphql/Queries/Characters.graphql";

//types
import { charactersResponse } from "../src/ts/interfaces/graphqlResponse.interfaces";
import { charactersPageProps } from "../src/ts/interfaces/paginationPageProps.interfaces";

export async function getServerSideProps({ query }: any) {
  const characters: ApolloQueryResult<charactersResponse> = await client.query({
    query: CHARACTERS_QUERY,
    variables: {
      withMoreData: false,
      page: parseInt(query.page),
      name: query.name || null,
    },
  });
  return {
    props: {
      characters: characters.data.characters.results,
      pagination: characters.data.characters.info,
    },
  };
}

export default function Characters({
  characters,
  pagination,
}: charactersPageProps): JSX.Element {
  return (
    <PageLayout headTitle="Chracters - Rick and Morty">
      <CharacterView characters={characters} info={pagination} />
    </PageLayout>
  );
}
