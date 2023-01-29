//modules
import Image from "next/image";

//MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//types and interfaces
import { characterBoxProps } from "../../ts/types/props.types";

export default function characterBox({
  character,
  handleOpen,
  setCurrentCharacterID,
}: characterBoxProps): JSX.Element {
  return (
    <Box>
      <Box
        className="cursor-pointer"
        onClick={() => {
          setCurrentCharacterID(character.id);
          handleOpen();
        }}
      >
        <Box className="relative aspect-square border border-light-blue border-solid shadow-main">
          <Image
            src={character.image}
            alt="img"
            className="object-cover w-[100%]"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </Box>
        <Box className="border border-light-blue border-solid shadow-main bg-transparent-black p-2 ">
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
    </Box>
  );
}
