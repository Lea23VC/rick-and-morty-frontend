import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CharacterBox from "../characters/characterBox";

import { character } from "../../ts/types/character.types";
import { pagination } from "../../ts/types/info.types";
import { useState as UseState } from "react";

type characterViewProps = {
  characters: character[];
  info: pagination;
};

export default function charactersView({
  characters,
  info,
}: characterViewProps): JSX.Element {
  const [page, setPage] = UseState(1);

  return (
    <Box className="sm:pt-4 md:pt-8">
      <Box>
        <Typography className="font-eurostile font-bold text-3xl sm:text-4xl md:text-5xl text-center uppercase text-shadow-main text-white">
          Characters
        </Typography>
      </Box>
      <Container className="py-10">
        <Grid container spacing={5} className="place-content-center">
          {characters.map((character, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={2}
              key={index}
              className="relative"
            >
              <CharacterBox character={character} />
            </Grid>
          ))}
        </Grid>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          className="bg-white"
        >
          <Pagination
            count={info.pages}
            color="primary"
            page={page}
            onChange={(e, page) => {
              setPage(page);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
