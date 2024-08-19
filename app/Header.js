/* eslint-disable react/react-in-jsx-scope */
"use client"; // This makes the component a Client Component

import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

function Header() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <>
      <Button
        color="inherit"
        href="/"
        sx={{ fontWeight: currentPath === "/" ? "bold" : "normal" }}
      >
        Home Page
      </Button>
      <Button
        color="inherit"
        href="/flashcards"
        sx={{ fontWeight: currentPath === "/flashcards" ? "bold" : "normal" }}
      >
        My Flashcards
      </Button>
      <Button
        color="inherit"
        href="/#about"
        sx={{ fontWeight: currentPath === "/#about" ? "bold" : "normal" }}
      >
        About
      </Button>
      <Button
        color="inherit"
        href="/#contact"
        sx={{ fontWeight: currentPath === "/#contact" ? "bold" : "normal" }}
      >
        Contact
      </Button>
      <Button
        color="inherit"
        href="/#pricing-plans"
        sx={{
          fontWeight: currentPath === "/#pricing-plans" ? "bold" : "normal",
        }}
      >
        Pricing
      </Button>
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ACDAFC" }}>
      <Toolbar>
        <img
          src="/logo.jpg"
          alt="Interviu Logo"
          style={{ marginRight: "10px", height: "40px" }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Interviu
        </Typography>
        {isSmallScreen ? (
          <>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "#ACDAFC", // Modern white background
                  borderRadius: "20px", // Rounded corners for a modern look
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                  maxHeight: "25vh", // Ensure it doesn't take the full height
                  overflowY: "auto", // Enable scrolling if content overflows
                  margin: "16px", // Add some margin for better spacing
                },
              }}
            >
              <Box
                sx={{
                  width: 250,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2, // Add some spacing between items
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {menuItems}
                  <SignedOut>
                    <ListItem button component="a" href="/sign-in">
                      <ListItemText primary="Login" />
                    </ListItem>
                    <ListItem button component="a" href="/sign-up">
                      <ListItemText primary="Sign Up" />
                    </ListItem>
                  </SignedOut>
                  <SignedIn>
                    <ListItem>
                      <UserButton />
                    </ListItem>
                  </SignedIn>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {menuItems}
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
