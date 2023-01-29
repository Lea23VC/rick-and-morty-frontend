//modules
import { useState as UseState } from "react";

//MUI components
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

//styled MUI components
import { StyledTextField } from "../styledMuiComponents/StyledTextField";

//types and interface
import { searchBarProps } from "../../ts/types/props.types";

export default function searchBar({ onClick, width, label }: searchBarProps) {
  const [searchQuery, setSearchQuery] = UseState("");
  //   const dataFiltered = filterData(searchQuery, data);

  return (
    <div className="flex justify-center items-center">
      <StyledTextField
        value={searchQuery}
        id="search-bar"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          setSearchQuery(target.value);
        }}
        onKeyDown={(e) => {
          if (e.code == "Enter") onClick(searchQuery);
        }}
        label={label}
        variant="outlined"
        size="small"
        className={`bg-white w-[70%]`}
      />
      <Box className="flex">
        <IconButton
          type="submit"
          aria-label="search"
          onClick={() => {
            onClick(searchQuery);
          }}
        >
          <SearchIcon color="primary" />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            setSearchQuery("");
            onClick("");
          }}
          className="float-right"
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </div>
  );
}
