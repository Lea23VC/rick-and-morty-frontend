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

import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

import { viewType } from "../../../ts/types/view.type";

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

      <Box className="flex gap-6  items-center pl-4">
        {views.map((view, index) => (
          <Link key={index} href={view.url}>
            <Box>
              <Typography
                className={`font-eurostile text-xs sm:text-sm md:text-md lg:text-lg  font-bold text-shadow-main text-white ${
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
      <Box className="self-center pl-6">
        <Box>{SearchBar}</Box>
      </Box>
    </Box>
  );
}
