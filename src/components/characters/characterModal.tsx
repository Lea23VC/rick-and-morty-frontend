//MUI components
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

//components
import ModalInfo from "../../components/layouts/modalLayout";
import CharacterContent from "../characters/characterModalContent";

//hooks
import { useLoadCharacter as UseLoadCharacter } from "../../hooks/useLoadCharacter";

//types and interfaces
import { modalProps } from "../../ts/types/props.types";
import { character } from "../../ts/types/character.types";

export default function characterModal({
  open,
  handleClose,
  dataID,
}: modalProps): JSX.Element {
  const { characterData, loading, called } = UseLoadCharacter(open, dataID);

  return (
    <ModalInfo
      open={open}
      handleClose={handleClose}
      // setData={setCharacterData}
    >
      {loading || !called || characterData == undefined ? (
        <Container className="flex justify-center">
          <CircularProgress />
        </Container>
      ) : (
        <CharacterContent characterData={characterData as character} />
      )}
    </ModalInfo>
  );
}
