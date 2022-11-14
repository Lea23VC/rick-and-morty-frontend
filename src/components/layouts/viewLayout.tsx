import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchBar from "../searchBar/searchBar";

type layoutProps = {
  title: string;
  children: JSX.Element;
  searchAction: (name: string) => void;
  loading: boolean;
};

export default function Layout({
  children,
  searchAction,
  title,
  loading,
}: layoutProps) {
  function searchLabel(): string {
    switch (title) {
      case "Characters":
        return "Enter a character name...";

      case "Episodes":
        return "Enter a episode name...";

      default:
        return "Search...";
    }
  }

  return (
    <Box className="sm:pt-4 md:pt-8">
      <Box>
        <Typography className="font-eurostile font-bold text-3xl sm:text-4xl md:text-5xl text-center uppercase text-shadow-main text-white">
          {title}
        </Typography>
      </Box>
      <Box className="p-4 bg-transparent-black m-4">
        <SearchBar onClick={searchAction} label={searchLabel()} />
      </Box>
      {children}
    </Box>
  );
}
