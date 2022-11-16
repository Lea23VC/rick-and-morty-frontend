import { episodeInitialData, episode } from "../ts/types/episode.types";
import { info } from "../ts/types/info.types";
export default function createEpisodesInfoArray(data: episodeInitialData[]) {
  return data.map(createEpisodeInfoArray);
}

export function createEpisodeInfoArray(episode: episodeInitialData): episode {
  var episode_data: info[] = [];

  episode_data = [
    { label: "Air data", value: episode.air_date },
    { label: "Episode code", value: episode.episode },
    { label: "Created", value: episode.created },
  ];

  return {
    id: episode.id,
    name: episode.name,
    info: episode_data,
    characters: episode.characters?.slice(0, 12),
  } as episode;
}
