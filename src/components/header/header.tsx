import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { useEffect as UseEffect, useRef as UseRef } from "react";

const views = [
  {
    label: "Characters",
  },
  { label: "Episodes" },
  { label: "Locations" },
  { label: "Favorites" },
];

export default function header(): JSX.Element {
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
    <header
      id="nav"
      className="transition-colors duration-300 fixed w-[100%] z-10 "
    >
      <Box className="flex py max-w-screen-lg m-auto px-2">
        <Box className="flex-1">
          <Image
            src="/images/logos/Rick_and_Morty.svg"
            alt="header logo"
            width={150}
            height={100}
          />
        </Box>

        <Box className="flex gap-6  items-center">
          {views.map((view, index) => (
            <Box key={index}>
              <Typography
                className="font-eurostile text-sm sm:text-lg md:text-xl font-bold text-shadow-main"
                variant="button"
              >
                {view.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </header>
  );
}
