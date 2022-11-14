import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import EPISODE_QUERY from "../../Graphql/Queries/Episode.graphql";

import { useEffect as UseEffect, useState as UseState } from "react";

import { useLazyQuery as UseLazyQuery } from "@apollo/client";
import { createCharacterInfoArray } from "../../utils/createCharacterInfoArray";

import { episode } from "../../ts/types/episode.types";

type modalProps = {
  open: boolean;
  handleClose: () => void;
  episodeID: Number | undefined;
};

export default function characterModal({
  open,
  handleClose,
  episodeID,
}: modalProps): JSX.Element {
  console.log("Character ID: ", episodeID);
  const [loadEpisode, { loading, data, error, called, refetch }] =
    UseLazyQuery(EPISODE_QUERY);

  const [episodeData, setEpisodeData] = UseState<episode | undefined>();
  UseEffect(() => {
    if (open && episodeID) {
      loadEpisode({ variables: { id: episodeID } })
        .then(({ data }) => {
          console.log("data");
          //   console.log(createCharacterInfoArray(data.character));
          //   setCharacterData(createCharacterInfoArray(data.character));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setEpisodeData(undefined);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 w-[80%] sm:w-[400px] md:w-[800px] bg-transparent-black -translate-y-1/2 -translate-x-1/2 shadow-main border border-light-blue border-solid p-5 sm:p-10">
        {loading || !called || episodeData == undefined ? (
          <Container className="flex justify-center">
            <CircularProgress />
          </Container>
        ) : (
          //   <CharacterContent characterData={characterData} />
          "s"
        )}
      </Box>
    </Modal>
  );
}
