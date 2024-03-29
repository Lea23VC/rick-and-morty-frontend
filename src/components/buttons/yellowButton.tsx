import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type buttonProps = {
  label: string;
  onClick?: () => void;
};

export default function yellowButton({
  onClick = () => {},
  label,
}: buttonProps) {
  return (
    <Stack spacing={2} direction="row" className="flex justify-center">
      <Button
        onClick={() => onClick()}
        variant="contained"
        color="primary"
        sx={{ borderWith: "2px", borderColor: "#000" }}
      >
        <Typography
          className="font-eurostile font-bold text-lg text-black  text-shadow-main "
          variant="button"
        >
          {label}
        </Typography>
      </Button>
    </Stack>
  );
}
