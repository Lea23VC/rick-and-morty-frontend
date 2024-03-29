//modules
import Image from "next/image";

//MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//components
import Button from "../buttons/yellowButton";

//hooks
import { useCheckFavorite } from "../../hooks/favorites/useCheckFavorite";

//utils
import { addRemoveFavorite } from "../../utils/addRemoveFavorite";

//types and interfaces
import { character } from "../../ts/types/character.types";

export default function CharacterModalContent({
  characterData,
}: {
  characterData: character;
}): JSX.Element {
  const { favorite, setFavorite } = useCheckFavorite(
    "characters",
    characterData
  );

  return (
    <Box className="w-[100%]">
      <Box className="flex relative flex-col md:flex-row">
        <Box className="relative  border border-light-blue shadow-main w-[100%] md:w-2/5 aspect-square ">
          <Image
            src={characterData.image}
            alt="img"
            layout="fill"
            objectFit="fill"
            className="aspect-square"
          />
        </Box>
        <Box className="border border-light-blue shadow-main bg-transparent-black p-4 md:w-3/5 w-[100%] ">
          <Box className="">
            <Typography
              variant="h1"
              className="font-eurostile font-bold text-light-blue text-3xl pb-2"
            >
              {characterData.name}
            </Typography>

            {characterData.info?.map((character, index) => (
              <Box key={index}>
                <Typography
                  className="font-eurostile font-bold text-white inline text-xl"
                  variant="body1"
                >
                  {character.label + ": "}
                </Typography>
                <Typography
                  className="font-eurostile text-white inline text-xl"
                  variant="body1"
                >
                  {character.value as string}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="pt-5">
        <Button
          onClick={() =>
            addRemoveFavorite(
              "characters",
              favorite,
              characterData,
              setFavorite
            )
          }
          label={!favorite ? "Add to favorites" : "Remove from favorites"}
        />
      </Box>
    </Box>
  );
}
