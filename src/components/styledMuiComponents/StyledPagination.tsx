import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

export const StyledPagination = styled(Pagination)(({ theme }) => ({
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
  [`& .MuiPagination-ul`]: {
    placeContent: "center",
  },
}));
