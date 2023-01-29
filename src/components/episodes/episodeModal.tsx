//MUI components
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

//components
import EpisodeModalContent from "../episodes/episodeModalContent";

//layouts
import InfoModal from "../layouts/modalLayout";

//hooks
import { useLoadEpisode as UseLoadEpisode } from "../../hooks/useLoadEpisode";

//types and interfaces
import { modalProps } from "../../ts/types/props.types";
import { episode } from "../../ts/types/episode.types";

export default function characterModal({
  open,
  handleClose,
  dataID,
}: modalProps): JSX.Element {
  const { episodeData, loading, called } = UseLoadEpisode(open, dataID);

  return (
    <InfoModal open={open} handleClose={handleClose}>
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
