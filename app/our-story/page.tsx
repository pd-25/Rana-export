"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import Image from "next/image";
import BannerBackground from "@/public/home/home-banner-pic.png";
import CsrPic from "@/public/home/csr-pic.png";
import AwardsPic from "@/public/home/awards-pic.png";
import TrustedPic1 from "@/public/home/trusted-pic-01.png";
import Icon1 from "@/public/home/home-banner-features-info-icon-01.svg";
import Icon2 from "@/public/home/home-banner-features-info-icon-02.svg";
import Icon3 from "@/public/home/home-banner-features-info-icon-03.svg";

const THEME_MAROON = "#986A6B";
const THEME_MAROON_LIGHT = "#C67E81";
const THEME_CREAM = "#FFF5F2";

export default function OurStoryPage() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: THEME_CREAM,
          backgroundImage: `url(${BannerBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pt: { xs: 15, md: 25 },
          pb: { xs: 20, md: 25 },
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255, 245, 242, 0.6)",
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ textAlign: "center", maxWidth: "900px", mx: "auto" }}>
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontSize: { xs: "40px", md: "64px" },
                letterSpacing: "0.05em",
              }}
            >
              OUR JOURNEY OF SOUND & SPIRIT
            </Typography>
            <Box
              sx={{
                width: "80px",
                height: "4px",
                bgcolor: THEME_MAROON_LIGHT,
                mx: "auto",
                mb: 4,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "#444",
                fontSize: { xs: "18px", md: "24px" },
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Discover the heritage of Rana Export, where ancient Himalayan
              traditions meet master craftsmanship to create sacred instruments
              for the modern soul.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: THEME_CREAM,
          height: "100px",
          position: "relative",
        }}
      />

      {/* Heritage Section */}
      <Container sx={{ py: { xs: 10, md: 15 } }}>
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              sx={{ mb: 4, fontSize: { xs: "32px", md: "48px" } }}
            >
              A LEGACY OF <br />
              <span style={{ color: THEME_MAROON_LIGHT }}>CRAFTSMANSHIP</span>
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
              Founded in the heart of West Bengal, Rana Export began with a
              simple yet profound mission: to preserve and share the ancient art
              of handmade singing bowls with the world. Our story is rooted in
              the deep spiritual heritage of the Himalayas and the tireless
              dedication of our local artisans.
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              For generations, the secrets of metal alloying and hand-hammering
              have been passed down through families in our community. We take
              immense pride in being a bridge between these traditional masters
              and mindfulness practitioners across the globe. Every piece we
              create carries the vibration of history and the intention of
              peace.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: { xs: "20px", md: "40px" },
                overflow: "hidden",
                boxShadow: "0 30px 60px rgba(152, 106, 107, 0.15)",
                transform: { md: "rotate(2deg)" },
                transition: "transform 0.5s ease",
                "&:hover": { transform: "rotate(0deg)" },
              }}
            >
              <Image
                src={TrustedPic1}
                alt="Heritage Craftsmanship"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: "#FDF9F8", py: { xs: 10, md: 15 } }}>
        <Container>
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography variant="h2" sx={{ color: THEME_MAROON }}>
              OUR CORE VALUES
            </Typography>
            <Box
              sx={{
                width: "60px",
                height: "4px",
                bgcolor: THEME_MAROON_LIGHT,
                mx: "auto",
                mt: 2,
              }}
            />
          </Box>
          <Grid container spacing={4}>
            {[
              {
                title: "AUTHENTICITY",
                desc: "Every bowl is hand-forged using traditional 7-metal alloys, ensuring authentic resonant frequencies that mass-produced alternatives cannot match.",
                icon: Icon1,
              },
              {
                title: "MINDFULNESS",
                desc: "We believe in the power of sound to heal, calm, and connect us to our inner selves. Our products are tools for transformation and presence.",
                icon: Icon2,
              },
              {
                title: "SUSTAINABILITY",
                desc: "Supporting local artisanal communities and preserving heritage crafts for future generations through fair trade and educational support.",
                icon: Icon3,
              },
            ].map((value, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: { xs: 4, md: 6 },
                    bgcolor: "#fff",
                    borderRadius: "30px",
                    height: "100%",
                    textAlign: "center",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-15px)",
                      boxShadow: "0 20px 40px rgba(152, 106, 107, 0.1)",
                    },
                    border: "1px solid #F3E5E4",
                  }}
                >
                  <Box
                    sx={{ mb: 4, display: "flex", justifyContent: "center" }}
                  >
                    <Image
                      src={value.icon}
                      alt={value.title}
                      width={80}
                      height={80}
                    />
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ mb: 2, fontSize: "20px", letterSpacing: "0.1em" }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#777", fontSize: "16px", lineHeight: 1.8 }}
                  >
                    {value.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Social Impact Section */}
      <Container sx={{ py: { xs: 10, md: 15 } }}>
        <Grid
          container
          spacing={8}
          alignItems="center"
          direction={{ xs: "column-reverse", md: "row" }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: { xs: "20px", md: "40px" },
                overflow: "hidden",
                boxShadow: "0 30px 60px rgba(152, 106, 107, 0.15)",
                transform: { md: "rotate(-2deg)" },
                transition: "transform 0.5s ease",
                "&:hover": { transform: "rotate(0deg)" },
              }}
            >
              <Image
                src={CsrPic}
                alt="Social Impact"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              sx={{ mb: 4, fontSize: { xs: "32px", md: "48px" } }}
            >
              PRESERVING <br />
              <span style={{ color: THEME_MAROON_LIGHT }}>
                CULTURE & COMMUNITY
              </span>
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
              Rana Export is more than a trading house; it's a social enterprise
              dedicated to the welfare of our artisans. By choosing our
              products, you are directly contributing to the education,
              healthcare, and economic stability of hundreds of families in
              rural West Bengal and Nepal.
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              Our commitment to Corporate Social Responsibility (CSR) is baked
              into our business model. We provide safe working environments,
              fair wages, and invest in the next generation of craftsmen to
              ensure this beautiful art form never fades away.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Awards Section */}
      <Box sx={{ bgcolor: THEME_MAROON, color: "#fff", py: 10 }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h2" sx={{ color: "#fff", mb: 2 }}>
                TRUSTED & <br />
                RECOGNIZED
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", mb: 4 }}
              >
                Our dedication to quality and community has been recognized
                globally by industry leaders and spiritual practitioners alike.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={AwardsPic}
                  alt="Awards and Recognition"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box sx={{ py: 15, textAlign: "center", bgcolor: "#fff" }}>
        <Container>
          <Typography variant="h2" sx={{ mb: 3 }}>
            BECOME PART OF OUR STORY
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 6, maxWidth: "700px", mx: "auto", color: "#666" }}
          >
            Whether you are a retail customer seeking peace or a wholesale
            partner looking to share authentic Himalayan treasures, we welcome
            you to our community.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
          >
            <button
              className="gradientButton"
              onClick={() => (window.location.href = "/our-collection")}
            >
              EXPLORE COLLECTION
            </button>
            <button
              className="gradientButtonAlt"
              onClick={() => (window.location.href = "/contact")}
              style={{
                background: "transparent",
                border: `2px solid ${THEME_MAROON}`,
                color: THEME_MAROON,
              }}
            >
              GET IN TOUCH
            </button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
