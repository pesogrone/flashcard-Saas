'use client'

import Image from "next/image";
import getStripe from "../utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  InputAdornment,
  Container,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  // const isSmallScreen = useMediaQuery("(max-width:600px)");
  const upgradeHandler = async() => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
    method: 'POST',
    headers: { origin: 'http://localhost:3000' },
  })
  const checkoutSessionJson = await checkoutSession.json()

  const stripe = await getStripe()
  const {error} = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  })

  if (error) {
    console.warn(error.message)
  }
}
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcards App</title>
        <meta
          name="description"
          content="Generate flashcards for effective learning"
        />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{ flexGrow: 1 }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Flashcards App
          </Typography>
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

      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h2"> Welcome to the Flashcards App</Typography>
        <Typography variant="h5">
          The easiest way to create flashcards for effective learning
        </Typography>
        <Button
          href="/generate"
          LinkComponent={Link}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Create Flashcards</Typography>
                <Typography variant="body1">
                  Generate flashcards based on the given topic or content.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  href="/generate"
                  LinkComponent={Link}
                  variant="contained"
                  color="primary"
                >
                  Create Flashcards
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">View Flashcards</Typography>
                <Typography variant="body1">
                  View and manage your flashcards in one place.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  View Flashcards
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Share Flashcards</Typography>
                <Typography variant="body1">
                  Share your flashcards with others for collaborative learning.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  Share Flashcards
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Pricing Plans
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Basic</Typography>
                <Typography variant="body1">
                  Create and manage up to 50 flashcards for free.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pro</Typography>
                <Typography variant="body1">
                  Create and manage unlimited flashcards for $9.99/month.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={ upgradeHandler}>
                  Upgrade Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Enterprise</Typography>
                <Typography variant="body1">
                  Custom pricing for organizations and teams.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" align="center">
          The Flashcards App is a simple and intuitive tool to help you create
          flashcards for effective learning. Whether you are a student studying
          for exams, a professional looking to enhance your skills, or someone
          who enjoys learning new things, the Flashcards App can help you
          create, manage, and share flashcards with ease.
        </Typography>
      </Box>
    </Container>
  );
}
