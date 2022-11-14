import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { useEffect as UseEffect, useRef as UseRef } from "react";
import Link from "next/link";
import { useRouter as UseRouter } from "next/router";
import { useState as UseState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../searchBar/searchBar";

const views = [
  {
    label: "Characters",
    url: "/characters",
  },
  { label: "Episodes", url: "/episodes" },
  { label: "Locations", url: "/locations" },
  { label: "Favorites", url: "/favorites" },
];

export default function header(): JSX.Element {
  const router = UseRouter();
  const pathname = router.pathname;
  console.log("router: ", pathname);

  function search(searchQuery: string) {
    switch (pathname) {
      case "/characters":
        router.push({
          pathname: "/characters",
          query: { name: searchQuery },
        });
    }
  }

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
          <SearchBar label="Search..." width={80} onClick={search} />
          {/* <IconButton
            className="items-center"
            type="submit"
            aria-label="search"
            onClick={() => {
              console.log("BBB");
            }}
          >
            <SearchIcon color="secondary" sx={{ fontSize: 30 }} />
          </IconButton> */}
        </Box>
      </Box>
    </header>
  );
}
