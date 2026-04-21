"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  IconButton,
  Alert,
  CircularProgress,
  alpha,
  Fade,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { submitEnquiry } from "@/app/actions/enquiryActions";

const THEME_MAROON = "#986A6B";
const THEME_MAROON_LIGHT = "#C67E81";
const THEME_CREAM = "#FFF5F2";
const THEME_TEXT = "#000000";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await submitEnquiry(formData);

    setLoading(false);
    if (result.success) {
      setMessage({
        type: "success",
        text: "Thank you for reaching out! We have received your message.",
      });
      (event.target as HTMLFormElement).reset();
    } else {
      setMessage({
        type: "error",
        text: result.error || "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* Header Section - Inspired by the home page section titles */}
      <Box
        sx={{
          bgcolor: THEME_CREAM,
          py: { xs: 8, md: 10 },
          borderBottom: "1px solid #EFCFCE",
          mb: 5,
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "32px", md: "48px" },
                color: THEME_MAROON,
                fontWeight: 700,
                textTransform: "uppercase",
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{
                width: "80px",
                height: "4px",
                bgcolor: THEME_MAROON_LIGHT,
                mx: "auto",
                mb: 3,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "18px", md: "22px" },
                color: "#666",
                maxWidth: "700px",
                mx: "auto",
                fontWeight: 300,
              }}
            >
              Have questions about our handmade singing bowls, bells, or gongs?{" "}
              <br />
              We are here to assist you with every enquiry.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>
          {/* Contact Details Panel */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              variant="h3"
              sx={{
                color: THEME_MAROON,
                fontWeight: 700,
                mb: 4,
                fontSize: "28px",
              }}
            >
              Get In Touch
            </Typography>

            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: THEME_MAROON_LIGHT,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    mb: 1.5,
                  }}
                >
                  Head Office & Factory
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: THEME_TEXT, fontSize: "16px", lineHeight: 1.7 }}
                >
                  Ramjibanpur, Paschim Medinipur,
                  <br />
                  West Bengal, Pincode - 721242
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1, alignItems: "center", color: THEME_MAROON }}
                >
                  <PhoneIcon fontSize="small" />
                  <Typography sx={{ fontWeight: 600 }}>
                    +91 90029 29605
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: THEME_MAROON_LIGHT,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    mb: 1.5,
                  }}
                >
                  Kolkata Office
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: THEME_TEXT, fontSize: "16px", lineHeight: 1.7 }}
                >
                  318 Modern Park, 7/4, Lake Terrace Road,
                  <br />
                  Near Star Club, Santoshpur, Kolkata-700075
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: THEME_MAROON_LIGHT,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    mb: 1.5,
                  }}
                >
                  Nepal Office
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: THEME_TEXT, fontSize: "16px", lineHeight: 1.7 }}
                >
                  Tibetan Singing Bowl Center Nardevi -18,
                  <br />
                  Gangalal Marg, Kathmandu-44600, Nepal
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1, alignItems: "center", color: THEME_MAROON }}
                >
                  <PhoneIcon fontSize="small" />
                  <Typography sx={{ fontWeight: 600 }}>
                    +977 98513 14984
                  </Typography>
                </Stack>
              </Box>

              <Box sx={{ pt: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: THEME_MAROON_LIGHT,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    mb: 2,
                  }}
                >
                  Connect Socially
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  {[
                    WhatsAppIcon,
                    InstagramIcon,
                    FacebookIcon,
                    LinkedInIcon,
                  ].map((Icon, i) => (
                    <IconButton
                      key={i}
                      sx={{
                        bgcolor: THEME_CREAM,
                        color: THEME_MAROON,
                        border: "1px solid #EFCFCE",
                        "&:hover": { bgcolor: THEME_MAROON, color: "#fff" },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Inquiry Form Panel */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: "20px",
                bgcolor: "#fff",
                border: "1px solid #EFCFCE",
                boxShadow: "0 20px 40px rgba(152, 106, 107, 0.05)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: THEME_MAROON,
                  fontWeight: 700,
                  mb: 1,
                  fontSize: "28px",
                }}
              >
                Send a Message
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", mb: 5, fontSize: "15px" }}
              >
                Fill out the form below and we will get back to you shortly.
              </Typography>

              {message && (
                <Fade in={!!message}>
                  <Alert
                    severity={message.type}
                    sx={{ mb: 4, borderRadius: "10px" }}
                  >
                    {message.text}
                  </Alert>
                </Fade>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      name="phone"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                      }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="How can we help?"
                      name="message"
                      multiline
                      rows={4}
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                      }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        bgcolor: THEME_MAROON,
                        color: "#fff",
                        py: 2,
                        borderRadius: "30px",
                        fontSize: "16px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        "&:hover": { bgcolor: THEME_MAROON_LIGHT },
                        boxShadow: "none",
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Submit Enquiry"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section Integrated smoothly */}
      <Box sx={{ height: 450, mt: 4, position: "relative" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.366997575268!2d88.38207277587031!3d22.490409735976613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271d988d86e47%3A0xff0de828f773669f!2s318%20Modern%20Park!5e0!3m2!1sen!2sin!4v1768925972920!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Rana Export Kolkata Office"
        />
      </Box>
    </Box>
  );
}
