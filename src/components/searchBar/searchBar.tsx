import { useState as UseState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  fontFamily: "Eurostile",
  [`& #search-bar-label`]: {
    fontFamily: "Eurostile",
    fontSize: "20px",
  },

  [`& input`]: {
    fontFamily: "Eurostile",
    fontSize: "20px",
  },

  [`& label.Mui-focused `]: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "0 5px 0",

    fontSize: 20,
    marginTop: "-10px !important",
  },
  [`& label.MuiFormLabel-filled `]: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "0 5px 0",

    fontSize: 20,
    marginTop: "-10px !important",
    color: "#00ffea",
  },
}));

type searchBarProps = {
  onClick: (name: string) => void;
};

export default function searchBar({ onClick }: searchBarProps) {
  const [searchQuery, setSearchQuery] = UseState("");
  //   const dataFiltered = filterData(searchQuery, data);

  return (
    <div className="bg-transparent-black p-4 flex justify-center">
      <StyledTextField
        id="search-bar"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          console.log(target.value);
          setSearchQuery(target.value);
        }}
        onKeyDown={(e) => {
          if (e.keyCode == 13) onClick(searchQuery);
        }}
        label="Enter a character name"
        variant="outlined"
        size="small"
        className="w-[70%] bg-white"
      />
      <IconButton
        type="submit"
        aria-label="search"
        onClick={() => {
          console.log("BBB");
          onClick(searchQuery);
        }}
      >
        <SearchIcon color="primary" />
      </IconButton>
    </div>
  );
}
