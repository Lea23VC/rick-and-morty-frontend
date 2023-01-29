import EPISODES_BY_IDS_QUERY from "../../../Graphql/Queries/EpisodesByIds.graphql";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { useState as UseState, useEffect as UseEffect } from "react";
import { episodeInitialData } from "../../../ts/types/episode.types";

export function useLoadEpisodesByID(episodesID: string[] | never[]) {
  const [episodes, setEpisodes] = UseState<episodeInitialData[]>([]);
  const [loadEpisodes, { error, called, loading }] = UseLazyQuery(
    EPISODES_BY_IDS_QUERY
  );

  UseEffect(() => {
    console.log("e");
    if (episodesID.length > 0) {
      loadEpisodes({ variables: { ids: episodesID } }).then(({ data }) => {
        const eps = data.episodesByIds[0].id != null ? data.episodesByIds : [];
        setEpisodes(eps);
      });
    } else return;
  }, [episodesID]);

  return { episodes, loading, called, error };
}
