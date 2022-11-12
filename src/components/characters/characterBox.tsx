import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Grid from "@mui/material/Grid";

import { characterProp } from "../../ts/types/character.types";

export default function characterBox({
  character,
}: characterProp): JSX.Element {
  type data = {
    label: string;
    value: string;
  };

  var character_data: data[];

  character_data = [
    { label: "Status", value: "Alive" },
    { label: "Species", value: "Human" },
    { label: "Gender", value: "Male" },
    { label: "Last known location", value: "Citadel of Ricks" },
    { label: "First seen in", value: "Earth (C-137)" },
  ];

  return (
    <Box className="">
      <Box className="relative w-[100%] aspect-square border border-light-blue shadow-main">
        <Image
          src={character.image}
          alt="img"
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </Box>
      <Box className="border border-light-blue shadow-main bg-transparent-black p-2 ">
        <Box>
          <Typography
            variant="h1"
            className="font-eurostile font-bold text-light-blue text-sm text-center"
          >
            {character.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
