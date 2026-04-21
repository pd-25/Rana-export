import React from "react";
import { Box, Container, Typography, Paper, Grid, Rating, Avatar, Stack, alpha } from "@mui/material";
import { FormatQuote as QuoteIcon } from "@mui/icons-material";

const reviews = [
  {
    name: "Marco Rossi",
    location: "Italy",
    rating: 5,
    text: "The quality of the singing bowls from Rana Export is simply unparalleled. The resonance and craftsmanship are much better than anything I've found in Europe. Truly a masterwork.",
  },
  {
    name: "Sarah Jenkins",
    location: "USA",
    rating: 5,
    text: "I ordered a custom set of gongs for my sound healing studio. The communication was excellent throughout the process, and the items arrived safely and beautifully packed.",
  },
  {
    name: "Akiko Tanaka",
    location: "Japan",
    rating: 5,
    text: "Excellent Tibetan bells. The weight and the sound quality are perfect for my daily meditation sessions. Highly recommend Rana Export for authentic handmade items.",
  },
  {
    name: "David Smith",
    location: "UK",
    rating: 4,
    text: "Beautiful products and very professional service. The delivery was slightly delayed due to customs, but the team kept me updated. The bowl itself is magnificent.",
  },
];

export default function TestimonialsPage() {
  return (
    <Box sx={{ bgcolor: "#FFF5F2", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" sx={{ color: "#986A6B", fontWeight: 700, mb: 1, textTransform: "uppercase" }}>
            Testimonials
          </Typography>
          <Box sx={{ width: "80px", height: "4px", bgcolor: "#C67E81", mx: "auto", mb: 3 }} />
          <Typography variant="h6" sx={{ color: "#666", fontWeight: 400 }}>
            Hear from our global community of sound practitioners and art lovers.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {reviews.map((review, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 6 }}>
              <Paper elevation={0} sx={{ p: 5, borderRadius: 5, position: "relative", border: "1px solid #EFCFCE", height: "100%" }}>
                <QuoteIcon sx={{ position: "absolute", top: 20, left: 20, fontSize: 40, color: alpha("#C67E81", 0.2) }} />
                
                <Stack spacing={2}>
                  <Rating value={review.rating} readOnly sx={{ color: "#986A6B" }} />
                  <Typography variant="body1" sx={{ fontStyle: "italic", lineHeight: 1.8, color: "#333" }}>
                    "{review.text}"
                  </Typography>
                  
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ pt: 2 }}>
                    <Avatar sx={{ bgcolor: "#986A6B" }}>{review.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "16px" }}>{review.name}</Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>{review.location}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
