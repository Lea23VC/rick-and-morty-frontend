import EPISODE_QUERY from "../Graphql/Queries/Episode.graphql";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";

import CHARACTER_QUERY from "../Graphql/Queries/Character.graphql";

import { useEffect as UseEffect, useState as UseState } from "react";

import { localStorageData } from "../ts/types/info.types";
import { characterInitialData } from "../ts/types/character.types";
import { episodeInitialData } from "../ts/types/episode.types";

type JSONLocalData = {
  [key: number]: localStorageData;
};

export function getLast(): [
  characterInitialData | undefined,
  episodeInitialData | undefined
] {
  const [lastFavoriteCharacter, setLastFavoriteCharacter] =
    UseState<characterInitialData>();
  const [lastFavoriteEpisode, setLastFavoriteEpisode] =
    UseState<episodeInitialData>();

  const [getCharacter] = UseLazyQuery(CHARACTER_QUERY);
  const [getEpisode] = UseLazyQuery(EPISODE_QUERY);

  UseEffect(() => {
    const char_ids: JSONLocalData = JSON.parse(
      localStorage.getItem("characters") || "{}"
    );

    const ep_ids: JSONLocalData = JSON.parse(
      localStorage.getItem("episodes") || "{}"
    );

    console.log("fav eps: ", ep_ids);

    if (getLastFavData(char_ids)[0]?.date) {
      getCharacter({
        variables: {
          id: getLastFavData(char_ids)[0].id,
        },
      }).then(({ data }) => {
        setLastFavoriteCharacter(data.character);
      });
    }

    if (getLastFavData(ep_ids)[0]?.date) {
      getEpisode({
        variables: {
          id: getLastFavData(ep_ids)[0].id,
        },
      }).then(({ data }) => {
        console.log("bvdffd: ", data);
        setLastFavoriteEpisode(data.episode);
      });
    }
  }, []);

  return [lastFavoriteCharacter, lastFavoriteEpisode];
}

function getLastFavData(info: JSONLocalData) {
  let sortable: localStorageData[] = [];
  for (var data in info) {
    const index: number = parseInt(data);
    sortable.push(info[index]);
  }

  sortable = sortable.sort(function (a, b) {
    return a.date < b.date ? 1 : -1;
  });

  console.log("sortable: ", sortable);
  return sortable;
}
