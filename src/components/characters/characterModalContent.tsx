import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "../buttons/yellowButton";
import { character } from "../../ts/types/character.types";
import { useEffect as UseEffect, useState as UseState } from "react";

type characterModalContent = {
  characterData: character;
};

export default function characterModalContent({
  characterData,
}: characterModalContent): JSX.Element {
  const [favorite, setFavorite] = UseState(false);

  function addRemoveFavorite() {
    if (typeof window !== "undefined") {
      var characters: string = localStorage.getItem("characters") as string;
      var values = characters ? JSON.parse(characters) : new Object();

      console.log(values);

      if (favorite) {
        delete values[`${characterData.id}`];
      } else {
        values[`${characterData.id}`] = { id: characterData.id };
      }
      localStorage.setItem("characters", JSON.stringify(values));
      setFavorite(!favorite);

      // localStorage.removeItem("characters");
    }
  }

  UseEffect(() => {
    if (typeof window !== "undefined") {
      var characters: string = localStorage.getItem("characters") as string;
      var values = characters ? JSON.parse(characters) : new Object();

      if (values[`${characterData.id}`]) {
        setFavorite(true);
      }
    }
  }, []);

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
          onClick={addRemoveFavorite}
          label={!favorite ? "Add to favorites" : "Remove from favorites"}
        />
      </Box>
    </Box>
  );
}
