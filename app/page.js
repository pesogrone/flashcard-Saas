"use client";

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
  Grid,
} from "@mui/material";
import Link from "next/link";
import "./globals.css"; // Adjust the path according to your project structure

export default function Home() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");
  const upgradeHandler = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          width: "100%",
          backgroundImage: `url('/Background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Lighter overlay for better text visibility
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "left",
            padding: 4,
          }}
        >
          <Typography
            variant={isSmallScreen ? "h3" : isMediumScreen ? "h2" : "h1"}
            sx={{
              mb: 0,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontFamily: "'Poppins', sans-serif", // Modern font
              fontWeight: 700,
              color: "#FFFFFF",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Subtle shadow for depth
            }}
          >
            Welcome to <span style={{ color: "#FFD700" }}>Interviu</span>
          </Typography>
          <Typography
            variant={isSmallScreen ? "h4" : isMediumScreen ? "h3" : "h2"}
            className="welcome-ai"
            sx={{
              mb: 5,
              mt: 0,
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              color: "#FFFFFF",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            Powered By AI
          </Typography>
          <Typography
            variant={isSmallScreen ? "h5" : isMediumScreen ? "h4" : "h3"}
            className="welcome-info"
            sx={{
              mt: 6, // Margin top to ensure it's right below the heading
              mb: 5, // Reduced margin bottom to bring the button closer
              maxWidth: "80%",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: "#FFFFFF",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            Your ultimate tool for creating flashcards for effective learning.
            Whether you're preparing for an interview or studying for exams,
            Interviu has got you covered!
          </Typography>
          <Button
            href="/generate"
            LinkComponent={Link}
            variant="contained"
            sx={{
              backgroundColor: "#1E90FF",
              color: "white",
              padding: isSmallScreen ? "10px 30px" : "12px 44px",
              fontSize: isSmallScreen ? "16px" : "18px",
              mt: 2, // Margin top to ensure it's right below the text
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Modern button shadow
              "&:hover": {
                backgroundColor: "rgb(21,101,192)", // Slightly darker shade for hover effect
              },
            }}
          >
            Start Now For Free!
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 4, paddingBottom: "3%" }}>
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          align="center"
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "rgba(135, 206, 235, 0.3)", // Light transparent background
                backdropFilter: "blur(10px)", // Blur effect for background
                borderRadius: "16px", // Rounded corners
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <CardContent>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{ fontWeight: "bold", color: "#007BFF" }}
                >
                  Create a New Topic
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Create comprehensive flashcards tailored to any topic or
                  content, enhancing your learning experience
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  href="/generate"
                  LinkComponent={Link}
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "20px" }}
                >
                  Start Here
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "rgba(135, 206, 235, 0.3)", // Light transparent background
                backdropFilter: "blur(10px)", // Blur effect for background
                borderRadius: "16px", // Rounded corners
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <CardContent>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{ fontWeight: "bold", color: "#007BFF" }}
                >
                  Your Flashcard Library
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Organize your flashcards all in one convenient location
                  enhancing the learning experience
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  href="/flashcards"
                  LinkComponent={Link}
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "20px" }}
                >
                  Your Flashcards
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "rgba(135, 206, 235, 0.3)", // Light transparent background
                backdropFilter: "blur(10px)", // Blur effect for background
                borderRadius: "16px", // Rounded corners
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <CardContent>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{ fontWeight: "bold", color: "#007BFF" }}
                >
                  (beta) Share Flashcards
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  Share your flashcards with others, fostering a collaborative
                  and engaging learning environment
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  href=""
                  LinkComponent={Link}
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "20px" }}
                >
                  Coming Soon
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box id="pricing-plans" sx={{ my: 4, paddingBottom: "3%" }}>
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          align="center"
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Pricing Plans
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Card
              sx={{
                backgroundColor: "rgba(135, 206, 235, 0.3)", // Light transparent background
                backdropFilter: "blur(10px)", // Blur effect for background
                borderRadius: "16px", // Rounded corners
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <CardContent>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{ fontWeight: "bold", color: "#007BFF" }}
                >
                  Basic
                </Typography>
                <Typography variant="h6" color="primary">
                  FREE
                </Typography>
                <Typography variant="h6" component="div">
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>✔ Create and organize up to 50 flashcards</li>
                    <br />
                    <li>
                      ✔ Improve your learning experience with simplicity and
                      efficiency
                    </li>
                    <br />
                    <li>✔ Access your custom flashcards from any device</li>
                    <br />
                    <li>
                      ✔ Our AI adapts to your learning preferences, optimizing
                      your study sessions for improved retention
                    </li>
                    <br />
                    <li>
                      ✔ Enjoy seamless learning without any advertisements
                    </li>
                    <br />
                    <li>
                      ✔ Transform your notes into flashcards with a single
                      click, utilizing advanced AI technology
                    </li>
                  </ul>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  href="/generate"
                  LinkComponent={Link}
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "20px" }}
                >
                  Start Now Free
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card
              sx={{
                backgroundColor: "rgba(135, 206, 235, 0.3)", // Light transparent background
                backdropFilter: "blur(10px)", // Blur effect for background
                borderRadius: "16px", // Rounded corners
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <CardContent>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{ fontWeight: "bold", color: "#007BFF" }}
                >
                  Pro
                </Typography>
                <Typography variant="h6" color="primary">
                  $9.99 /month
                </Typography>
                <Typography variant="h6" component="div">
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>✔ Enjoy unlimited flashcards</li>
                    <br />
                    <li>✔ Get first access to new beta features</li>
                    <br />
                    <li>✔ Access new products</li>
                    <br />
                    <li>
                      ✔ Improve your learning experience with simplicity and
                      efficiency
                    </li>
                    <br />
                    <li>✔ Access your custom flashcards from any device</li>
                    <br />
                    <li>
                      ✔ Our AI adapts to your learning preferences, optimizing
                      your study sessions for improved retention
                    </li>
                    <br />
                    <li>
                      ✔ Enjoy seamless learning without any advertisements
                    </li>
                    <br />
                    <li>
                      ✔ Transform your notes into flashcards with a single
                      click, utilizing advanced AI technology
                    </li>
                  </ul>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={upgradeHandler}
                  sx={{ borderRadius: "20px" }}
                >
                  Get Full Access
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box id="about" sx={{ my: 4, paddingBottom: "3%" }}>
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          align="center"
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          About Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "rgba(135, 206, 235, 0.3)", // Light transparent background
                backdropFilter: "blur(10px)", // Blur effect for background
                borderRadius: "16px", // Rounded corners
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <CardContent>
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  sx={{ fontWeight: "bold", color: "#007BFF" }}
                >
                  Our Mission
                </Typography>
                <Typography variant="h6" sx={{ color: "#555" }}>
                  Interviu is an AI-powered tool designed to help students and
                  professionals for creating and managing flashcards. It offers
                  advanced features for effective learning and caters to diverse
                  needs. With intuitive interfaces and powerful AI, Interviu
                  simplifies generating, organizing, and sharing flashcards.
                  Join us for a smarter way to learn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
