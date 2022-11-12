import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import CharacterBox from "../characters/characterBox";

export default function charactersView(): JSX.Element {
  return (
    <Box>
      <Box>
        <Typography className="font-eurostile font-bold text-2xl sm:text-3xl md:text-4xl text-center uppercase text-shadow-main">
          Characters
        </Typography>
      </Box>
      <CharacterBox />
    </Box>
  );
}
