"use client"; // Optional if this needs to use client-side functionality

import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      id="contact"
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

export default Footer;
