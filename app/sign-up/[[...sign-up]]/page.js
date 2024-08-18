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
import { SignIn, SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <Container>
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">Sign Up</Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
