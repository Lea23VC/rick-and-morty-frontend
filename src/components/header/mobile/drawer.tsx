import {
  useState as UseState,
  Fragment,
  KeyboardEvent,
  MouseEvent,
} from "react";
import Link from "next/link";

import { useRouter as UseRouter } from "next/router";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

import { viewType } from "../../../ts/types/view.type";

type Anchor = "top" | "left" | "bottom" | "right";

type drawerProps = {
  toggleDrawer: (
    anchor: string,
    open: boolean
  ) => (event: KeyboardEvent | MouseEvent) => void;
  state: any;
  views: viewType[];
  SearchBar: JSX.Element;
};

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  [`& .MuiPaper-root`]: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
}));

export default function SwipeableTemporaryDrawer({
  toggleDrawer,
  state,
  views,
  SearchBar,
}: drawerProps) {
  const router = UseRouter();
  const pathname = router.pathname;

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer("left", false)}
          className="float-right"
        >
          <CloseIcon />
        </IconButton>

        {views.map((text, index) => (
          <Link key={index} href={text.url}>
            <ListItem key={text.label} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Typography
                      className={`text-white font-eurostile text-xl sm:text-md md:text-lg font-bold text-shadow-main ${
                        pathname == text.url && "text-main-yellow"
                      }`}
                    >
                      {text.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      {SearchBar}
    </Box>
  );

  return (
    <div>
      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <StyledSwipeableDrawer
            key={anchor}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </StyledSwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
}
