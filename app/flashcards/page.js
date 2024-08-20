"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleDeleteSet = async () => {
    if (!user || deleteIndex === null) return;
    const updatedFlashcards = flashcards.filter((_, i) => i !== deleteIndex);
    setFlashcards(updatedFlashcards);

    const docRef = doc(collection(db, "users"), user.id);
    await updateDoc(docRef, { flashcards: updatedFlashcards });

    setOpen(false);
    setDeleteIndex(null);
  };

  const handleOpenDialog = (index) => {
    setDeleteIndex(index);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDeleteIndex(null);
  };

  return (
    <Box sx={{ backgroundColor: "#ACDAFC", minHeight: "100vh", padding: 4 }}>
      <Container maxWidth="100vw">
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Your Flashcards Sets
        </Typography>
        <Button
          href="/generate"
          variant="contained"
          sx={{
            display: "block",
            margin: "20px auto",
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          CREATE A NEW SET
        </Button>
        <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    handleCardClick(flashcard.name);
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h4"
                      align="center"
                      sx={{
                        backgroundColor: "#90caf9",
                        padding: "10px",
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {flashcard.name.toUpperCase()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpenDialog(index)}
                  sx={{
                    display: "block",
                    margin: "-10px auto 0 auto",
                    backgroundColor: "#d32f2f",
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    "&:hover": {
                      backgroundColor: "#e57373",
                      color: "black",
                    },
                  }}
                >
                  Delete Set
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this flashcard set? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSet} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
