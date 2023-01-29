//MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

//components
import SearchBar from "../searchBar/searchBar";
import Pagination from "../pagination/pagination";

//types and interfaces
import { layoutProps } from "../../ts/types/props.types";

//utils
import { searchLabel } from "../../utils/searchLabel";

export default function Layout({
  children,
  searchAction,
  title,
  info,
}: layoutProps) {
  return (
    <Box className="sm:py-4 md:py-8">
      <Box>
        <Typography
          id="title"
          className="font-eurostile font-bold text-3xl sm:text-4xl md:text-5xl text-center uppercase text-shadow-main text-white"
        >
          {title}
        </Typography>
      </Box>
      <Box className="p-4 bg-transparent-black m-4">
        <SearchBar onClick={searchAction} label={searchLabel(title)} />
      </Box>
      <Container className="py-10">
        {children}
        {info ? <Pagination info={info} /> : null}
      </Container>
    </Box>
  );
}
