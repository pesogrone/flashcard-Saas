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
  Grid,
} from "@mui/material";
import Link from "next/link";
import './globals.css'; // Adjust the path according to your project structure

export default function Home() {
  const upgradeHandler = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
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
    <Container maxWidth="100vw">
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundImage: `url('/background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "blue",
        }}
      >
        <Typography variant="h1" color="black" className="welcome-header">
          Welcome to <span style={{ color: "yellow" }}>Interviu</span>
        </Typography>
        <Typography variant="h2" color="rgb(21,101,192)" className="welcome-ai">
          Powered By AI
        </Typography>
        <Typography variant="h3" color="black" className="welcome-info">
          Your ultimate tool for creating flashcards for effective learning. Whether you're preparing for an interview, studying for exams, or organizing recipes, Interviu has got you covered!
        </Typography>
        <Button
          href="/generate"
          LinkComponent={Link}
          variant="contained"
          color="primary"
          sx={{
          mt: 27,
          backgroundColor: 'rgb(127,231,248)',
          color: 'black',
          padding: '12px 44px', // Increases the size of the button
          fontSize: '18px',
          '&:hover': {
          backgroundColor: 'rgb(21,101,192)', // Slightly darker shade for hover effect
          },
          }}
          >
          Start Now For Free!
        </Button>

      </Box>
      <Box sx={{ my: 4, paddingBottom: "3%" }}>
        <Typography variant="h3" align="center">
          Features
        </Typography>
        <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
          paddingBottom: "",
           backgroundColor: "rgba(135, 206, 235, 0.3)", // More transparent sky blue background
           backdropFilter: "blur(10px)", // Optional: Blur effect for background
           borderRadius: "12px", // Optional: Rounded corners
           boxShadow: "21px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow for depth
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           justifyContent: "center",
           textAlign: "center",
          }}
          >
          <CardContent>
            <Typography variant="h4">Create a New Topic</Typography>
            <Typography variant="h6">
             Create comprehensive flashcards tailored to any topic or content, enhancing your learning experience
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              href="/generate"
             LinkComponent={Link}
              variant="contained"
             color="primary"
            >
            Start Here
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
       <Card
          sx={{
            backgroundColor: "rgba(135, 206, 235, 0.3)", // More transparent sky blue background
            backdropFilter: "blur(10px)", // Optional: Blur effect for background
            borderRadius: "12px", // Optional: Rounded corners
            boxShadow: "21px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow for depth
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          >
          <CardContent>
            <Typography variant="h4">Your Flashcard Library</Typography>
            <Typography variant="h6">
              Organize your flashcards all in one convenient location enhancing the learning experience
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              href="/flashcards"
              LinkComponent={Link}
              variant="contained"
              color="primary"
            >
            Your Library
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            backgroundColor: "rgba(135, 206, 235, 0.3)", // More transparent sky blue background
            backdropFilter: "blur(10px)", // Optional: Blur effect for background
            borderRadius: "12px", // Optional: Rounded corners
            boxShadow: "21px 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow for depth
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h4">(beta)Share Flashcards</Typography>
            <Typography variant="h6">
            Share your flashcards with others, fostering a collaboritive and engaging learning environment          </Typography>
          </CardContent>
          <CardActions>
            <Button
              href=""
              LinkComponent={Link}
              variant="contained"
              color="primary"
            >
            Coming Soon
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Box>

  <Box sx={{ my: 4, }}>
  <Typography variant="h3" align="center" gutterBottom>
    Pricing Plans
  </Typography>
  <Grid container spacing={4}>
    <Grid item xs={12} sm={6} md={6}>
      <Card
        sx={{
          backgroundColor: "rgba(135, 206, 235, 0.3)", // More transparent sky blue background
          backdropFilter: "blur(10px)", // Optional: Blur effect for background
          borderRadius: "12px", // Optional: Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow for depth
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h4">Basic</Typography>
          <Typography variant="h6">
          create and manage up to 50 flashcards at no cost, enhancing your learning experience with ease and efficiency
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            href="/generate"
            LinkComponent={Link}
            variant="contained"
            color="primary"
          >
            Start Now Free
          </Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
      <Card
        sx={{
          backgroundColor: "rgba(135, 206, 235, 0.3)", // More transparent sky blue background
          backdropFilter: "blur(10px)", // Optional: Blur effect for background
          borderRadius: "12px", // Optional: Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow for depth
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h4">Pro</Typography>
          <Typography variant="h6">
          Enjoy unlimited flashcards and get first access to new beta features and new products for just $9.99/month
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={upgradeHandler}>
            Get full Access
          </Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          backgroundColor: "rgba(135, 206, 235, 0.3)", // More transparent sky blue background
          backdropFilter: "blur(10px)", // Optional: Blur effect for background
          borderRadius: "12px", // Optional: Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow for depth
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* <CardContent>
          <Typography variant="h6">Enterprise</Typography>
          <Typography variant="body1">
            Custom pricing for organizations and teams.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            href="/generate"
            LinkComponent={Link}
            variant="contained"
            color="primary"
          >
            Get Started
          </Button>
        </CardActions> */}
      </Card>
    </Grid>
  </Grid>
</Box>

      <Box sx={{ my: 4, }}>
  <Typography variant="h3" align="center" gutterBottom>
    About Interviu
  </Typography>
  <Typography 
    variant="h5" 
    align="center" 
  >
    Interviu is an AI-powered tool developed
    to provide a user-friendly experience with
    a vast variety of options for creating and
    managing flashcards. Leveraging cutting-edge
    technology, Interviu ensures that users have
    access to the most advanced features for effective
    learning and preparation. Our platform is designed
    to cater to diverse learning needs, whether you’re
    a student, professional, or lifelong learner. With
    intuitive interfaces and powerful AI capabilities,
    Interviu makes it easy to generate, organize,
    and share flashcards, enhancing your study sessions
    and knowledge retention. Join the Interviu community
    and experience a smarter way to learn and grow.
  </Typography>
</Box>
    </Container>
  );
}
