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
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box className="border border-light-blue shadow-main bg-transparent-black p-4 ">
        <Box>
          <Typography
            variant="h1"
            className="font-eurostile font-bold text-light-blue text-xl pb-2"
          >
            {character.name}
          </Typography>

          {character.info.map((aaa, index) => (
            <Box key={index}>
              <Typography
                className="font-eurostile font-bold text-white inline"
                variant="body1"
              >
                {aaa.label + ": "}
              </Typography>
              <Typography
                className="font-eurostile text-white inline"
                variant="body1"
              >
                {aaa.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
