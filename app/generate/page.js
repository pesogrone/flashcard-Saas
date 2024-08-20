"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, collection, getDoc, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setFlashcards(data);
      });
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    if (!isSignedIn || !user) {
      alert("You must be signed in to save flashcards.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.id);
      const docSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      let collections = [];
      if (docSnap.exists()) {
        collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("Flashcard collection with the same name already exists.");
          return;
        }
      }

      collections.push({ name });

      batch.set(userDocRef, { flashcards: collections }, { merge: true });

      const colRef = collection(userDocRef, name);

      flashcards.forEach((flashcard, index) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();

      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert(
        "An error occurred while saving your flashcards. Please try again."
      );
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#ACDAFC",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-start",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "white",
              backgroundColor: "#1976d2",
              borderRadius: "8px",
              padding: "10px 20px",
              "&:hover": {
                color: "black",
                backgroundColor: "#ffeb3b",
              },
            }}
            onClick={() => router.push("/")}
          >
            Back
          </Button>
        </Box>
        <Box
          sx={{
            mt: 4,
            mb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333" }}>
            Create Your Custom Flashcards
          </Typography>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#333", fontWeight: "500", marginBottom: "20px" }}
          >
            Create personalized flashcards for any topic! Whether it's interview
            prep, study material, language learning, coding, or memory training,
            we've got you covered. Start now and master your content!
          </Typography>
          <Paper
            sx={{
              p: 4,
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="What Would you like to learn today?"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: "8px",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Click Here to generate your Flashcards
            </Button>
          </Paper>
        </Box>
        {loading && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={"400px"}
                      sx={{ borderRadius: "12px" }}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
        {!loading && flashcards?.length > 0 && (
          <Box sx={{ mt: 4, textAlign: "center", width: "100%" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: 350,
                      borderRadius: "12px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent>
                        <Box
                          sx={{
                            backgroundColor: "#87CEEB",
                            perspective: "1000px",
                            "& > div": {
                              transition: "transform 0.6s",
                              transformStyle: "preserve-3d",
                              position: "relative",
                              width: "100%",
                              height: "300px",
                              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                              transform: flipped[index]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            },
                            "& > div > div": {
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              backfaceVisibility: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 2,
                              boxSizing: "border-box",
                              overflow: "auto",
                              textOverflow: "ellipsis",
                              whiteSpace: "pre-wrap",
                              wordWrap: "break-word",
                            },
                            "& > div > div:nth-of-type(2)": {
                              transform: "rotateY(180deg)",
                            },
                          }}
                        >
                          <div>
                            <div>
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{ padding: 2 }}
                              >
                                {flashcard.front}
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{ padding: 2 }}
                              >
                                {flashcard.back}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Flashcards</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcards collection.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Collection Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{ borderRadius: "8px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontWeight: "bold" }}>
              Cancel
            </Button>
            <Button onClick={saveFlashcards} sx={{ fontWeight: "bold" }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
