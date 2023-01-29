import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)(({ theme }) => ({
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
