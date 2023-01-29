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
import { searchByName } from "../../../utils/searchByName";

export default function charactersView({
  characters,
  info,
}: characterViewProps): JSX.Element {
  const router = UseRouter();
  const [title, setTitle] = UseState("Characters");

  return (
    <ViewLayout
      title={title}
      searchAction={(name) => {
        searchByName(setTitle, name, "Characters", router);
      }}
      info={info}
    >
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
