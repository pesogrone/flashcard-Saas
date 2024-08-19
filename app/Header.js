"use client"; // This makes the component a Client Component

import { AppBar, Typography, Toolbar, Button, Box } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function Header() {
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
            fontFamily: "Comic Sans MS, cursive, sans-serif",
            color: "#FFD700",
          }}
        >
          Interviu
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" href="/">
            Home Page
          </Button>
          <Button color="inherit" href="/flashcards">
            My Flashcards
          </Button>
          <Button color="inherit" href="#about">
            About
          </Button>
          <Button color="inherit" href="#contact">
            Contact
          </Button>
          <Button color="inherit" href="#pricing-plans">
            Pricing
          </Button>
        </Box>
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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
