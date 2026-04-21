"use client"

import { Box, Container, Typography, Stack, Grid } from "@mui/material"
import Link from "next/link"
import Image from "next/image"

import footerTopInfoImage1 from "@/public/footer/footer-info-icon-01.svg"
import footerTopInfoImage2 from "@/public/footer/footer-info-icon-02.svg"
import footerTopInfoImage3 from "@/public/footer/footer-info-icon-03.svg"
import footerTopInfoImage4 from "@/public/footer/footer-info-icon-04.svg"


export default function Footer() {
  const kolkataMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.366997575268!2d88.38207277587031!3d22.490409735976613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271d988d86e47%3A0xff0de828f773669f!2s318%20Modern%20Park!5e0!3m2!1sen!2sin!4v1768925972920!5m2!1sen!2sin"


  return (
    <>
      <Box component="section" className="footerTopInfoWrapper">

        <Container>
          <Grid container spacing={{ xs: 2, sm: 6, md: 6 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                className="footerTopInfoCard"
                sx={{
                  textAlign: "center"
                }}
              >
                <Box className="iconBox">
                  <Image src={footerTopInfoImage1} alt="footer top info image" />
                </Box>
                <Typography variant="h3">Meditate Anywhere </Typography>
                <Typography variant="body1">
                  Lightweight and travel-friendly
                  for on-the-go mindfulness.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                className="footerTopInfoCard"
                sx={{
                  textAlign: "center"
                }}
              >
                <Box className="iconBox">
                  <Image src={footerTopInfoImage2} alt="footer top info image" />
                </Box>
                <Typography variant="h3"> Deep-Resonant Sound</Typography>
                <Typography variant="body1">
                  Promotes inner peace and
                  spiritual connection.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                className="footerTopInfoCard"
                sx={{
                  textAlign: "center"
                }}
              >
                <Box className="iconBox">
                  <Image src={footerTopInfoImage3} alt="footer top info image" />
                </Box>
                <Typography variant="h3">Ergonomic Design </Typography>
                <Typography variant="body1">
                  Fits comfortably in your hand for efortless use.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                className="footerTopInfoCard"
                sx={{
                  textAlign: "center"
                }}
              >
                <Box className="iconBox">
                  <Image src={footerTopInfoImage4} alt="footer top info image" />
                </Box>
                <Typography variant="h3">Compact & Space-Saving </Typography>
                <Typography variant="body1">
                  Perfect for your home, studio
                  or travel bag.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        component="footer"
        sx={{
          backgroundColor: "#7A4851", // Dark reddish-brown background
          color: "#ffffff",
          pt: { xs: 4, md: 6 },
        }}
      >
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 4, md: 4 },
            }}
          >
            {/* Our Story Section */}
            <Box sx={{ maxWidth: { xs: "100%", md: "255px" } }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: { xs: "18px", md: "20px" },
                  fontWeight: 600,
                  mb: 2,
                  color: "#ffffff",
                  borderBottom: "3px solid #A9636C",
                  paddingBottom: 1,
                  display: "inline-block",
                }}
              >
                Our Story
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "14px", md: "16px" },
                  lineHeight: 1.6,
                  color: "#ffffff",
                  mb: 2,
                }}
              >
                We are known as the reputed
                manufacturer of a wide
                assortment of HAND MADE
                SINGING BOWL , Tibetan Singing
                Bowl and Bell. GONG AND
                CYMBLE AND TINGSHA , These
                products are famous for their
                simple design and easy to use.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "14px", md: "16px" },
                  lineHeight: 1.6,
                  color: "#ffffff",
                  mb: 2,
                }}
              >
                We are known as the reputed
                manufacturer of a wide
                assortment of HAND MADE
                SINGING BOWL , Tibetan Singing
                Bowl and Bell. GONG AND
                CYMBLE AND TINGSHA , These
                products are famous for their
                simple design and easy to use.
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "14px", md: "16px" },
                  lineHeight: 1.6,
                  color: "#ffffff",
                }}
              >
                We are known as the reputed
                manufacturer of a wide
                assortment of HAND MADE
              </Typography>
            </Box>

            {/* Resources Section */}
            <Box>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: { xs: "18px", md: "20px" },
                  fontWeight: 600,
                  mb: 2,
                  color: "#ffffff",
                  borderBottom: "3px solid #A9636C",
                  paddingBottom: 1,
                  display: "inline-block",
                }}
              >
                Resources
              </Typography>
              <Stack direction="column" spacing={1.5}>
                <Link
                  href="/delivery-information"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Delivery Information
                </Link>
                <Link
                  href="/terms-conditions"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Terms & conditions
                </Link>
                <Link
                  href="/privacy-policy"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/payment"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Payment
                </Link>
              </Stack>
            </Box>

            {/* Helpful Links Section */}
            <Box>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: { xs: "18px", md: "20px" },
                  fontWeight: 600,
                  mb: 2,
                  color: "#ffffff",
                  borderBottom: "3px solid #A9636C",
                  paddingBottom: 1,
                  display: "inline-block",
                }}
              >
                Helpful Links
              </Typography>
              <Stack direction="column" spacing={1.5}>
                <Link
                  href="/contact"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Become a customer
                </Link>
                <Link
                  href="/testimonials"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Testimonials
                </Link>
                <Link
                  href="/blog"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Blog
                </Link>
              </Stack>
            </Box>

            {/* Contact Section */}
            <Box sx={{ paddingLeft: { xs: 0, md: 5 } }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: { xs: "18px", md: "20px" },
                  fontWeight: 600,
                  mb: 2,
                  color: "#ffffff",
                  borderBottom: "3px solid #A9636C",
                  paddingBottom: 1,
                  display: "inline-block",
                }}
              >
                Contact
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                  }}
                >
                  Chandi (RANA JI)
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                  }}
                >
                  HEAD OFFICE FACTORY:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    lineHeight: 1.6,
                    color: "#ffffff",
                  }}
                >
                  Ramjibanpur, Paschim Medinipur,
                  West Bengal, Pincode - 721242
                  Mobile +91 90029 29605
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                  }}
                >
                  KOLKATA OFFICE:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    lineHeight: 1.6,
                    color: "#ffffff",
                  }}
                >
                  318 modern park, 7/4, Lake Terrace Road, Near Star Club, Lake Terrace, Santoshpur, Kolkata-700075
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 600,
                    color: "#ffffff",
                    mb: 1,
                  }}
                >
                  NEPAL OFFICE:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    lineHeight: 1.6,
                    color: "#ffffff",
                    mb: 1,
                  }}
                >
                  Tibetan Singing Bowl Center Nardevi -18, Kathmandu, Nepal Gangalal Marg, Kathmandu-44600
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    color: "#ffffff",
                  }}
                >
                  Phone : +977-98513 14984
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Map Section */}
          <Box className="footerMapWrapper"
            sx={{
              width: "100%",
              height: { xs: "300px", md: "340px" },
              overflow: "hidden",
            }}
          >
            <iframe
              src={kolkataMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kolkata Office Location"
            />
          </Box>


        </Container>
        {/* Copyright Notice */}
        <Box
          className="footerCopyrightWrapper"
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              color: "#ffffff",
            }}
          >
            Copyright ©2025 Rana Export Trading House
          </Typography>
        </Box>
      </Box>
    </>
  )
}
