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
  width?: number;
  label: string;
};

export default function searchBar({ onClick, width, label }: searchBarProps) {
  const [searchQuery, setSearchQuery] = UseState("");
  //   const dataFiltered = filterData(searchQuery, data);

  return (
    <div className="flex justify-center">
      <StyledTextField
        id="search-bar"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;

          setSearchQuery(target.value);
        }}
        onKeyDown={(e) => {
          if (e.keyCode == 13) onClick(searchQuery);
        }}
        label={label}
        variant="outlined"
        size="small"
        className={`bg-white w-[70%]`}
      />
      <IconButton
        type="submit"
        aria-label="search"
        onClick={() => {
          onClick(searchQuery);
        }}
      >
        <SearchIcon color="primary" />
      </IconButton>
    </div>
  );
}
