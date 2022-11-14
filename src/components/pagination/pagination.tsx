import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { pagination } from "../../ts/types/info.types";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  padding: "20px 0 10px",
  [`& .MuiPaginationItem-text`]: {
    color: "white !important",
    fontFamily: "Eurostile",
    fontSize: 16,
    textShadow: "0 0 7px rgba(99,253,251,0.54)",
  },
  [`& .MuiPaginationItem-ellipsis`]: {
    fontFamily: "Roboto",
  },
}));

type paginationProps = {
  paginationInfo: pagination;
  page: number;
  onChange: (page: number) => void;
};

export default function paginationFunction({
  paginationInfo,
  page,
  onChange,
}: paginationProps) {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <StyledPagination
        count={paginationInfo.pages}
        color="primary"
        defaultPage={1}
        page={page}
        onChange={(e, page) => {
          onChange(page);
        }}
      />
    </Stack>
  );
}
