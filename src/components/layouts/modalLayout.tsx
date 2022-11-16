import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
      <Box className="overflow-x-hidden	 absolute top-1/2 left-1/2 w-[80%] sm:w-[400px] md:w-[800px] bg-transparent-black -translate-y-1/2 -translate-x-1/2 shadow-main border border-light-blue border-solid p-10 sm:p-10 max-h-[80vh] overflow-y-scroll scrollbar-thumb-main-yellow scrollbar-thumb-rounded scrollbar-thin">
        <Box className="relative">
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            className="absolute -top-12  sm:-right-10 -right-10 z-50"
            onClick={() => {
              handleClose();
              setData(undefined);
            }}
          >
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
