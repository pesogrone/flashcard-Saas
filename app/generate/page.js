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
            alert("An error occurred while saving your flashcards. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "skyblue",
                minHeight: "100vh",
                padding: 4,
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{ color: "white", backgroundColor: "darkblue",
                          "&:hover": {
                            color: "red"
,                           backgroundColor: "lightblue",
                          },
                        }}
                        onClick={() => router.push('/')}
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
                    }}>
                    <Typography variant="h3">Create Your Custom Flashcards</Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                        Enter your topics or questions below to generate personalized flashcards. 
                        Think about interview questions, study topics, learning a language, coding development,
                        music ,memory training, recipes, or any other content you want to master!
                    </Typography>
                    <Paper sx={{ p: 4, width: "100%" }}>
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
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Click Here to generate your Flashcards
                        </Button>
                    </Paper>
                </Box>
                {loading && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5">Flashcards Preview</Typography>
                        <Grid container spacing={3}>
                            {Array(9)
                                .fill(0)
                                .map((_, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Skeleton
                                            variant="rounded"
                                            width={"100%"}
                                            height={"400px"}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                )}
                {!loading && flashcards?.length > 0 && (
                    <Box sx={{ mt: 4,  textAlign: "center", width: "100%", }}>
                        <Typography variant="h5">Flashcards Preview</Typography>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ height: 300 }}>
                                        <CardActionArea
                                            onClick={() => handleCardClick(index)}
                                        >
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        backgroundColor: "rgb(135,206,235)",
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
                                                            overflow: "hidden",
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
                                                                variant="h5"
                                                                component="div"
                                                            >
                                                                {flashcard.front}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography
                                                                variant="h5"
                                                                component="div"
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
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={saveFlashcards}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
