import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function mainTitle(): JSX.Element {
  return (
    <Container className="flex justify-center flex-col items-center">
      <Box className="h-[100px] w-[80%] xs:w-[300px] sm:w-[400px] aspect-auto relative mb-6">
        <Image
          src="/images/logos/Rick_and_Morty.svg"
          alt="Rick and Morty logo"
          layout="fill"
          objectFit="fill"
          priority
        />
      </Box>

      <Box>
        <Typography
          variant="h1"
          gutterBottom
          className="font-eurostile text-xl sm:text-2xl md:text-3xl"
        >
          Your favorites characters and episodes!
        </Typography>
      </Box>
    </Container>
  );
}
