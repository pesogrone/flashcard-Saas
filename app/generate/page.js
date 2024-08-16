"use client";
export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { flashcards, setFlashcards } = useState([]);
  const { flipped, setFlipped } = useState(false);
  const { text, setText } = useState("");
  const { name, setName } = useState("");
  const { open, setOpen } = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch("/api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(data);
      });
    const handleCardClick = (id) => {
      setFlipped((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const handleOpen = () => {
      setOpenI(true);
    };
    const handleClose = () => {
      setOpenI(false);
    };
    const saveFlashcards = async () => {
      if (!name) {
        alert("Please enter a name for the flashcard set");
        return;
      }
      const batch = writeBatch(db);
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const flashcardSetRef = collection(db, "flashcardSets");
        const newFlashcardSetRef = doc(flashcardSetRef);
        if (collections.find((f) => f.name === name)) {
          alert(
            "Flashcard set with the same name already exists. Please choose a different name"
          );
          return;
        }
        batch.set(newFlashcardSetRef, {
          name,
          flashcards,
          userId: user.uid,
        });
        await batch.commit();
        alert("Flashcards saved successfully");
        router.push("/flashcards");
      } else {
        alert("User not found");
      }
    };
  };
}
