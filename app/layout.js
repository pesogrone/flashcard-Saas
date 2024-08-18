import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Typography, Toolbar, Button, Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interviu",
  description: "Generate flashcards for effective learning",
};

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(25, 118, 210, 0.9)", // Background color
        color: "white", // Text color
        padding: "10px 0", // Padding for spacing
        textAlign: "center", // Center align text
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1">
        Contact us: <a style={{ color: "white" }}>headstarterteam@gmail.com</a>
      </Typography>
      <Typography variant="body2">
        © {new Date().getFullYear()} Interviu All rights reserved.
      </Typography>
    </Box>
  );
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Head>
            <title>Interviu</title>
            <meta
              name="description"
              content="Generate flashcards for effective learning"
            />
          </Head>

          <AppBar position="static">
            <Toolbar>
              <img src="/logo.jpg" alt="Interviu Logo" style={{ marginRight: '10px', height: '40px' }} />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontFamily: 'Comic Sans MS, cursive, sans-serif', color: '#FFD700' }}
              >
                Interviu
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button color="inherit" href="/">
                  Home Page
                </Button>
                <Button color="inherit" href="/flashcards">
                  Your Interviu Library
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
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
