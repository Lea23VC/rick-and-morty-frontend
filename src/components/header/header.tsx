import Box from "@mui/material/Box";

import DesktopHeader from "./desktop/desktopHeader";
import MobileHeader from "./mobile/mobileHeader";
import { useRouter as UseRouter } from "next/router";

import { viewType } from "../../ts/types/view.type";

import SearchBar from "../searchBar/searchBar";

const views: viewType[] = [
  { label: "Home", url: "/" },
  {
    label: "Characters",
    url: "/characters",
    searchOnPage: () => {
      console.log("");
    },
  },
  { label: "Episodes", url: "/episodes" },

  { label: "Favorites", url: "/favorites" },
];

export default function header(): JSX.Element {
  const router = UseRouter();
  const pathname = router.pathname;

  function search(searchQuery: string) {
    if (pathname === "/") {
      router.push({
        pathname: "/favorites",
        query: { name: searchQuery },
      });
    } else {
      router.push({
        pathname: pathname,
        query: { name: searchQuery },
      });
    }
  }

  const SearchBarComponent = <SearchBar label="Search..." onClick={search} />;

  return (
    <header
      id="nav"
      className="transition-colors duration-300 fixed w-[100%] z-10 "
    >
      <Box className="hidden sm:block ">
        <DesktopHeader SearchBar={SearchBarComponent} views={views} />
      </Box>

      <Box className="block sm:hidden">
        <MobileHeader views={views} SearchBar={SearchBarComponent} />
      </Box>
    </header>
  );
}
