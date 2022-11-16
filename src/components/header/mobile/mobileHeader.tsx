import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import Image from "next/image";

import Drawer from "./drawer";
import { useState as UseState, KeyboardEvent, MouseEvent } from "react";

import { viewType } from "../../../ts/types/view.type";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.6)",
}));
type Anchor = "top" | "left" | "bottom" | "right";

type mobileHeaderProps = {
  views: viewType[];
  SearchBar: JSX.Element;
};

export default function mobileHeader({ views, SearchBar }: mobileHeaderProps) {
  const [state, setState] = UseState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: string, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      console.log("aas");
      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <Box className="flex-1">
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box>
            <Image
              src="/images/logos/Rick_and_Morty.svg"
              alt="header logo"
              width={120}
              height={80}
            ></Image>
          </Box>
          <Drawer
            toggleDrawer={toggleDrawer}
            state={state}
            views={views}
            SearchBar={SearchBar}
          />
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
