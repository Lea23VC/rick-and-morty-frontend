//modules
import { useEffect as UseEffect, useState as UseState } from "react";

//hooks
import { useLazyQuery as UseLazyQuery } from "@apollo/client";

//queries
import EPISODE_QUERY from "../../../Graphql/Queries/Episode.graphql";

//utils
import { createEpisodeInfoArray } from "../../../utils/createEpisodeInfoArray";

//types and interfaces
import { episode, episodeInitialData } from "../../../ts/types/episode.types";

export function useLoadEpisode(open: boolean, episodeID: number | undefined) {
  const [episodeData, setEpisodeData] = UseState<episode | undefined>(
    undefined
  );
  const [loadEpisode, { loading, called, data, error }] = UseLazyQuery<{
    episode: episodeInitialData;
  }>(EPISODE_QUERY);

  UseEffect(() => {
    if (episodeID) {
      loadEpisode({ variables: { id: episodeID } });
    }
  }, [episodeID]);

  UseEffect(() => {
    if (data && data.episode && open) {
      setEpisodeData(createEpisodeInfoArray(data.episode));
    } else return setEpisodeData(undefined);
  }, [data, open]);

  return { episodeData, loading, called, data };
}
