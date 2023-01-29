import { Dispatch, SetStateAction } from "react";
import { character, characterInitialData } from "./character.types";
import { episodeInitialData } from "./episode.types";
import { GridSize, GridSpacing } from "@mui/material/Grid";
import { ResponsiveStyleValue } from "@mui/system";
import { pagination } from "./info.types";

export type homeProps = {
  characters: characterInitialData[];
  episodes: episodeInitialData[];
};

export type characterBoxProps = {
  character: character;
  handleOpen: () => void;
  setCurrentCharacterID: Dispatch<SetStateAction<number | undefined>>;
};

export type responsiveSizes = boolean | GridSize | undefined;

export type charactersGridProp = {
  characters: characterInitialData[];
  loading?: boolean;
  xs?: responsiveSizes;
  sm?: responsiveSizes;
  md?: responsiveSizes;
  lg?: responsiveSizes;
  xl?: responsiveSizes;
  spacing?: ResponsiveStyleValue<GridSpacing> | undefined;
  columnSpacing?: ResponsiveStyleValue<GridSpacing> | undefined;
};

export type modalProps = {
  open: boolean;
  handleClose: () => void;
  characterID: number | undefined;
};

export type characterViewProps = {
  characters: characterInitialData[];
  info: pagination;
};

export type ModalLayoutProps = {
  children: JSX.Element;
  open: boolean;
  handleClose: () => void;
  // setData: Dispatch<SetStateAction<character | episode | undefined>>;
};

export type layoutProps = {
  title: string;
  children?: JSX.Element | null;
  searchAction: (name: string) => void;
  info?: pagination;
};
