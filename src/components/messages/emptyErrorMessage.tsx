import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type messageProp = {
  message: string;
};

export default function emptyErrorMessage({ message }: messageProp) {
  return (
    <Box className="h-[300px] grid items-center">
      <Typography
        variant="h1"
        gutterBottom
        className="font-eurostile text-xl sm:text-2xl md:text-3xl text-center"
      >
        {message}
      </Typography>
    </Box>
  );
}
