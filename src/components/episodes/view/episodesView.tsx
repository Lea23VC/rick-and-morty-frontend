//modules
import { useState as UseState } from "react";

//layouts
import ViewLayout from "../../layouts/viewLayout";

//components
import EpisodesGrid from "../episodesGrid";

//hooks
import { useRouter as UseRouter } from "next/router";

//utils
import { searchByName } from "../../../utils/searchByName";

//types and interfaces
import { episodesViewProps } from "../../../ts/types/props.types";

export default function episodesView({
  episodes,
  info,
}: episodesViewProps): JSX.Element {
  const [title, setTitle] = UseState("Episodes");
  const router = UseRouter();

  return (
    <ViewLayout
      title={title}
      searchAction={(name) => {
        searchByName(setTitle, name, "Episodes", router);
      }}
      info={info}
    >
      <EpisodesGrid xs={12} sm={6} md={4} lg={3} episodes={episodes} />
    </ViewLayout>
  );
}
