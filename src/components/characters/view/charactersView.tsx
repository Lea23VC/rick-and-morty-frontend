//modules
import { useState as UseState } from "react";

//layouts
import ViewLayout from "../../layouts/viewLayout";

//components
import CharactersGrid from "../charactersGrid";

//hooks
import { useRouter as UseRouter } from "next/router";

//types and interfaces
import { characterViewProps } from "../../../ts/types/props.types";

export default function charactersView({
  characters,
  info,
}: characterViewProps): JSX.Element {
  const router = UseRouter();
  const [title, setTitle] = UseState("Characters");
  function searchByName(name: string): void {
    setTitle(name != "" ? `Searching characters: ${name}...` : "Characters");
    router.push({
      pathname: router.pathname,
      query: { ...router.query, name: name, page: 1 },
    });
  }
  return (
    <ViewLayout title={title} searchAction={searchByName} info={info}>
      <CharactersGrid
        characters={characters}
        xs={6}
        md={3}
        lg={2}
        spacing={{ xs: 0, sm: 3, md: 3 }}
      />
    </ViewLayout>
  );
}
