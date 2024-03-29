import React, { useEffect } from "react";
import {
  Button,
  MenuList,
  MenuItem,
  Paper,
  ClickAwayListener,
  Popper,
  Grow,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function DropdownMenu({ route, classes, currPath }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <div>
        <Button
          aria-label="navigate"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          disableRipple
          className={`${classes.navLink} ${
            currPath.startsWith(route.path) && "active"
          }`}
        >
          {route.name}
          <ExpandMore />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {route.dropRoutes.map((dropRoute) => (
                      <Link
                        to={route.path + dropRoute.path}
                        key={route.path + dropRoute.path + dropRoute.name}
                      >
                        <MenuItem
                          onClick={handleClose}
                          className={`${classes.listItem} ${
                            currPath === route.path + dropRoute.path && "active"
                          }`}
                        >
                          {dropRoute.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
