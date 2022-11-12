import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";

type modalProps = {
  open: boolean;
  handleClose: () => void;
  characterID: number;
};

export default function characterModal({
  open,
  handleClose,
  characterID,
}: modalProps): JSX.Element {
  console.log(open);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 w-[500px] bg-transparent-black -translate-y-1/2 -translate-x-1/2 shadow-main border border-light-blue p-10">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}
