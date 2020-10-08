import React from "react";
import {
  IconButton,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import routes from "../../data/routes";
import { Link } from "react-router-dom";
import CallToActionButton from "./CallToActionButton";
import NestedListNav from "./NestedListNav";

export default function MobileNav({
  classes,
  currPath,
  drawerOpen,
  setDrawerOpen,
}) {
  return (
    <Hidden mdUp>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        style={{ marginRight: 0 }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        <div role="presentation" onKeyDown={() => setDrawerOpen(false)}>
          <List className={classes.list}>
            {routes.map((route) => {
              if (!route.dropRoutes)
                return (
                  <Link key={route.path} to={route.path}>
                    <ListItem
                      className={`${classes.listItem} ${
                        currPath === route.path && "active"
                      }`}
                      button
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary={route.name} />
                    </ListItem>
                  </Link>
                );
              else
                return (
                  <NestedListNav
                    key={route.path + route.name}
                    route={route}
                    classes={classes}
                    currPath={currPath}
                    setDrawerOpen={setDrawerOpen}
                  />
                );
            })}
          </List>
        </div>
        <Box mb={2}>
          <CallToActionButton classes={classes} />
        </Box>
      </SwipeableDrawer>
    </Hidden>
  );
}