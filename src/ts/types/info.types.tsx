export type info = {
  label: string;
  value: string | Date;
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

export type localStorageData = {
  id: number;
  date: Date;
};
