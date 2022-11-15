import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {
  useEffect as UseEffect,
  useRef as UseRef,
  useState as UseState,
} from "react";
import Link from "next/link";
import { useRouter as UseRouter } from "next/router";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";

import { viewType } from "../../../ts/types/view.type";
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  color: "white",
  [`& .MuiMenuItem-gutters`]: {
    fontFamily: "Eurostile !important",
  },
  [`& .MuiFormLabel-root`]: {
    display: "none",
  },
  [`& .MuiFormControlLabel-label`]: {
    color: "white",
    fontFamily: "Eurostile !important",
    fontSize: "16px",
  },
}));
type headerDesktopProps = {
  SearchBar: JSX.Element;
  views: viewType[];
};

export default function desktopHeader({
  SearchBar,
  views,
}: headerDesktopProps): JSX.Element {
  const router = UseRouter();
  const pathname = router.pathname;

  UseEffect(() => {
    const navbar = document.getElementById("nav");

    window.addEventListener("scroll", function (e) {
      if (window.pageYOffset > 50) {
        navbar?.classList.add("bg-transparent-black");
      } else {
        navbar?.classList.remove("bg-transparent-black");
      }
    });
  }, []);

  return (
    <Box className="flex py max-w-screen-lg m-auto px-2">
      <Box className="flex-1">
        <Link href="/">
          <Image
            src="/images/logos/Rick_and_Morty.svg"
            alt="header logo"
            width={150}
            height={100}
          />
        </Link>
      </Box>

      <Box className="flex gap-6  items-center">
        {views.map((view, index) => (
          <Link key={index} href={view.url}>
            <Box>
              <Typography
                className={`font-eurostile text-xs sm:text-md md:text-lg font-bold text-shadow-main ${
                  pathname == view.url && "text-main-yellow"
                } `}
                variant="button"
              >
                {view.label}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
      <Box className="self-center px-2">
        <Box></Box>
        <Box>{SearchBar}</Box>
        {/* <Box sx={{ minWidth: 100, paddingBottom: 2 }}>
          <StyledFormControl
            sx={{ minWidth: 100 }}
            hiddenLabel
            color="secondary"
            variant="standard"
          >
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio size="small" />}
                label="Favorites"
              />
              <FormControlLabel
                value="male"
                control={<Radio size="small" />}
                label="Characters"
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" />}
                label="Characters"
              />
            </RadioGroup>
          </StyledFormControl>
        </Box> */}
      </Box>
    </Box>
  );
}
