import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { Dispatch, SetStateAction } from "react";
import { character } from "../../ts/types/character.types";
import { episode } from "../../ts/types/episode.types";

type ModalLayoutProps = {
  children: JSX.Element;
  open: boolean;
  handleClose: () => void;
  setData: Dispatch<SetStateAction<character | episode | undefined>>;
};

export default function ModalLayout({
  children,
  open,
  handleClose,
  setData,
}: ModalLayoutProps) {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setData(undefined);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 w-[80%] sm:w-[400px] md:w-[800px] bg-transparent-black -translate-y-1/2 -translate-x-1/2 shadow-main border border-light-blue border-solid p-5 sm:p-10">
        {children}
      </Box>
    </Modal>
  );
}
