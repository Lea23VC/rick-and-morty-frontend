import { location } from "./location.types";

export type info = {
  label: string;
  value: string;
};

export type pagination = {
  count: number;
  pages: number;
  next?: number;
  prev?: number;
};

export type paginationInfoArray = {
  info: pagination[];
};

export type paginationInfo = {
  info: pagination;
};
