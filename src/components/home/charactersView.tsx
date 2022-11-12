import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Grid from "@mui/material/Grid";

import CharacterBox from "../characters/characterBox";

import { charactersResult } from "../../ts/types/character.types";

export default function charactersView({
  characters,
}: charactersResult): JSX.Element {
  return (
    <Box className="sm:pt-4 md:pt-8">
      <Box>
        <Typography className="font-eurostile font-bold text-3xl sm:text-4xl md:text-5xl text-center uppercase text-shadow-main text-white">
          Characters
        </Typography>
      </Box>
      <Grid container spacing={5} className="place-items-stretch">
        {characters.map((character, index) => (
          <Grid item xs={4} key={index} className="relative">
            <CharacterBox character={character} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
