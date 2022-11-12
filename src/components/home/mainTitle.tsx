import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function mainTitle(): JSX.Element {
  return (
    <Container className="flex justify-center flex-col items-center">
      <Box>
        <Image
          src="/images/logos/Rick_and_Morty.svg"
          alt="Rick and Morty logo"
          width={500}
          height={500}
          priority
        />
      </Box>

      <Box>
        <Typography
          variant="h1"
          gutterBottom
          className="font-eurostile text-xl sm:text-2xl md:text-3xl"
        >
          Characters, locations and episodes!
        </Typography>
      </Box>
    </Container>
  );
}
