import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Link,
  Box,
  TextField,
} from "@mui/material";
import { SignIn } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flashcards SaaS
          </Typography>
          <Button color="inherit">
            <Link color="inherit" underline="none" href="/sign-in" passHref>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link color="inherit" underline="none" href="/sign-up" passHref>
              Sign up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">Sign In</Typography>
        <SignIn />
      </Box>
    </Container>
  );
}
