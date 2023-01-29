import InfoModal from "../layouts/modalLayout";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import EPISODE_QUERY from "../../Graphql/Queries/Episode.graphql";
import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { useEffect as UseEffect, useState as UseState } from "react";

import { createEpisodeInfoArray } from "../../utils/createEpisodeInfoArray";

import { episode } from "../../ts/types/episode.types";

import EpisodeModalContent from "../episodes/episodeModalContent";
import { character } from "../../ts/types/character.types";

type modalProps = {
  open: boolean;
  handleClose: () => void;
  episodeID: number | undefined;
};

export default function characterModal({
  open,
  handleClose,
  episodeID,
}: modalProps): JSX.Element {
  console.log("Character ID: ", episodeID);
  const [loadEpisode, { loading, data, error, called, refetch }] =
    UseLazyQuery(EPISODE_QUERY);

  const [episodeData, setEpisodeData] = UseState<
    episode | character | undefined
  >();
  UseEffect(() => {
    if (open && episodeID) {
      loadEpisode({ variables: { id: episodeID } })
        .then(({ data }) => {
          setEpisodeData(createEpisodeInfoArray(data.episode));
          //   setCharacterData(createCharacterInfoArray(data.character));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  return (
    <InfoModal open={open} handleClose={handleClose} setData={setEpisodeData}>
      {loading || !called || episodeData == undefined ? (
        <Container className="flex justify-center">
          <CircularProgress />
        </Container>
      ) : (
        <EpisodeModalContent episodeData={episodeData as episode} />
      )}
    </InfoModal>
  );
}
