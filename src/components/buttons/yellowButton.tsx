import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function yellowButton() {
  return (
    <Stack spacing={2} direction="row" className="flex justify-center">
      <Button
        variant="contained"
        color="secondary"
        sx={{ borderWith: "2px", borderColor: "#000" }}
      >
        <Typography
          className="font-eurostile font-bold text-lg"
          variant="button"
        >
          Add to favorites
        </Typography>
      </Button>
    </Stack>
  );
}
