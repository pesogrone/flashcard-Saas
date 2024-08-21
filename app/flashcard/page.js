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
  LinearProgress,
  useMediaQuery,
} from "@mui/material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMiniatures, setShowMiniatures] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");

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
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleShuffle = () => {
    const shuffledFlashcards = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledFlashcards);
    setCurrentIndex(0);
  };
  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100%",
        minHeight: "90vh",
        backgroundColor: "#ACDAFC",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.history.back()}
        sx={{
          alignSelf: "flex-start",
          margin: isSmallScreen ? 1 : 2,
        }}
      >
        Back
      </Button>
      <Grid
        container
        spacing={3}
        sx={{
          mt: 0.2,
          justifyContent: "center",
          padding: isSmallScreen ? 4 : isMediumScreen ? 5 : 10,
        }}
      >
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4, textAlign: "center", width: "100%" }}>
            {/* Display the name of the flashcard set */}
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "#1a237e", // Darker blue for better contrast
                mb: 5,
                textAlign: "center",
              }}
            >
              {search.toUpperCase()}
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: 300,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      handleCardClick(currentIndex);
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
                            transform: flipped[currentIndex]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                            backgroundColor: flipped[currentIndex]
                              ? "#1976d2" // Primary color
                              : "#ACDAFC",
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
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                overflowY: "auto",
                                maxHeight: "100%",
                                textAlign: "center",
                                fontFamily: "Montserrat, sans-serif",
                                color: "#1a237e", // Darker blue for better contrast
                              }}
                            >
                              {flashcards[currentIndex].front}{" "}
                              {/* Display flashcard front content */}
                            </Typography>
                          </div>
                          {/* Back side of the card */}
                          <div>
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                overflowY: "auto",
                                maxHeight: "100%",
                                textAlign: "center",
                                fontFamily: "Montserrat, sans-serif",
                                color: "#1a237e", // Darker blue for better contrast
                              }}
                            >
                              {flashcards[currentIndex].back}{" "}
                              {/* Display flashcard back content */}
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
                      handleDeleteCard();
                    }}
                    sx={{
                      mt: -2,
                      backgroundColor: "#d32f2f",
                      fontSize: "0.75rem",
                      padding: "2px 6px",
                      alignSelf: "center",
                      "&:hover": {
                        backgroundColor: "#ff5252",
                        color: "white",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Card>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handlePrev}
                    disabled={flashcards.length <= 1}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleShuffle}
                    disabled={flashcards.length <= 1}
                  >
                    Shuffle
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={flashcards.length <= 1}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                width: "100%",
                maxWidth: 600,
                mt: 2,
                mx: "auto",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                padding: 2,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 12,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    backgroundColor: "#1976d2", // Primary color
                    transition: "width 0.5s ease-in-out",
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  fontFamily: "Montserrat, sans-serif",
                  color: "#1a237e", // Darker blue for better contrast
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {currentIndex + 1} / {flashcards.length}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  textAlign: "center",
                  mt: 1,
                  fontFamily: "Montserrat, sans-serif",
                  color: "#757575", // Grey color for secondary text
                  fontStyle: "italic",
                }}
              ></Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowMiniatures((prev) => !prev)}
              sx={{
                mt: 2,
                ml: 2,
                alignContent: "center",
                backgroundColor: "#1976d2", // Primary color
                "&:hover": {
                  backgroundColor: "#2196f3", // Lighter shade of primary color
                },
              }}
            >
              {showMiniatures ? "Hide" : "Show"} all flashcards
            </Button>

            {showMiniatures && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                    <Card
                      sx={{
                        height: { xs: 120, sm: 100 }, // Adjust height for small screens
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 2,
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transition: "transform 0.3s",
                        position: "relative", // Added for dot positioning
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => {
                          setCurrentIndex(index);
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: "center",
                              fontFamily: "Montserrat, sans-serif",
                              color: "#1a237e", // Darker blue for better contrast
                              fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Adjust font size for small screens
                            }}
                          >
                            {flashcard.front}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      {currentIndex === index && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: "#1976d2", // Primary color for the dot
                          }}
                        />
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Grid>
    </Container>
  );
}
