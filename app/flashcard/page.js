"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteCard = async (index) => {
    if (!user) return;
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);

    const colRef = collection(doc(collection(db, "users"), user.id), search);
    const cardDoc = doc(colRef, flashcards[index].id);
    await deleteDoc(cardDoc);
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 0.2, justifyContent: "center", backgroundColor: "darkblue" }}>
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4, textAlign: "center", width: "100%" }}>
            {/* Display the name of the flashcard set */}
            <Typography variant="h3">Flashcard Library: {search}</Typography>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <CardActionArea
                      onClick={() => {
                        handleCardClick(index);
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            perspective: "1000px",
                            "& > div": {
                              transition: "transform 0.6s",
                              transformStyle: "preserve-3d",
                              position: "relative",
                              width: "100%",
                              height: "250px",
                              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                              transform: flipped[index]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                              backgroundColor: flipped[index] ? "rgb(25,118,210)" : "lightblue",
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
                              overflow: "hidden", // Ensure the content stays within the box
                              textOverflow: "ellipsis", // Handle overflowed text
                              whiteSpace: "pre-wrap", // Allow text to wrap
                              wordWrap: "break-word", // Break long words
                            },
                            "& > div > div:nth-of-type(2)": {
                              transform: "rotateY(180deg)",
                            },
                          }}
                        >
                          <div>
                            {/* Front side of the card */}
                            <div>
                              <Typography variant="h5" component="div" sx={{ overflowY: "auto", maxHeight: "100%", textAlign: "center" }}>
                                {flashcard.front}  {/* Display flashcard front content */}
                              </Typography>
                            </div>
                            {/* Back side of the card */}
                            <div>
                              <Typography variant="h5" component="div" sx={{ overflowY: "auto", maxHeight: "100%", textAlign: "center" }}>
                                {flashcard.back}  {/* Display flashcard back content */}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCard(index);
                      }}
                      sx={{ mt: -2, backgroundColor: "darkblue", fontSize: "0.75rem", padding: "2px 6px", alignSelf: "center",
                      '&:hover': {
                      backgroundColor: "yellow",
                      color: "black"
                    } }}
                    >
                      Delete
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Grid>
    </Container>
  );
}
