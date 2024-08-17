"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Container,
    CircularProgress,
    Typography,
    Box,
    Button,
} from "@mui/material";
import Link from "next/link";
const Results = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return;
            try {
                const res = await fetch(
                    `/api/checkout_sessions?session_id=${session_id}`
                );
                const sessionData = await res.json();
                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(sessionData.error);
                }
            } catch (err) {
                setError("An error occurred while retrieving the session.");
            } finally {
                setLoading(false);
            }
        };
        fetchCheckoutSession();
    }, [session_id]);

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Loading...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }
    return (
        <Container
            maxWidth="sm"
            sx={{ textAlign: "center", mt: 4, alignItems: "center" }}>
            {session.payment_status === "paid" ? (
                <>
                    <Typography variant="h4">
                        Thank you for your purchase!
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">
                            Session ID: {session_id}
                        </Typography>
                        <Typography variant="body1">
                            We have received your payment. You will receive an
                            email with the order details shortly.
                        </Typography>
                        <Button href="/" LinkComponent={Link}>
                            Return to dashboard
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h4">Payment failed</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1">
                            Your payment was not successful. Please try again.
                        </Typography>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Results;
