import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const THEME_MAROON = "#986A6B";
const THEME_MAROON_LIGHT = "#C67E81";
const THEME_CREAM = "#FFF5F2";

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await (prisma as any).blog.findUnique({
    where: { slug: slug },
  });

  if (!post || !post.isActive) {
    notFound();
  }

  return (
    <Box sx={{ pb: 15, bgcolor: "#fff" }}>
      {/* Immersive Header Section */}
      <Box 
        sx={{ 
          pt: { xs: 15, md: 25 }, 
          pb: { xs: 15, md: 30 }, 
          bgcolor: THEME_CREAM,
          position: "relative",
          textAlign: "center"
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h4" 
            sx={{ 
              color: THEME_MAROON_LIGHT, 
              mb: 3, 
              fontWeight: 800, 
              letterSpacing: "0.2em",
              fontSize: "14px"
            }}
          >
            THE RANA JOURNAL
          </Typography>
          <Typography 
            variant="h1" 
            sx={{ 
              mb: 4, 
              fontSize: { xs: "36px", md: "64px" }, 
              lineHeight: 1.1,
              fontWeight: 800,
              color: THEME_MAROON
            }}
          >
            {post.title}
          </Typography>
          
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Avatar 
              sx={{ 
                bgcolor: THEME_MAROON, 
                width: 48, 
                height: 48,
                fontSize: "18px",
                fontWeight: 700
              }}
            >
              {post.author?.[0] || "R"}
            </Avatar>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: "16px", color: THEME_MAROON }}>
                BY {post.author?.toUpperCase() || "ADMIN"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#888", letterSpacing: "0.05em" }}>
                {new Date(post.createdAt).toLocaleDateString("en-US", { 
                  month: "long", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Featured Image Overlapping */}
      {post.image && (
        <Container maxWidth="lg" sx={{ mt: { xs: -10, md: -20 }, mb: 10, position: "relative", zIndex: 5 }}>
          <Box 
            sx={{ 
              width: "100%", 
              height: { xs: 350, md: 650 }, 
              borderRadius: { xs: "30px", md: "60px" }, 
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 50px 100px rgba(152, 106, 107, 0.2)",
              border: "10px solid #fff"
            }}
          >
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
        </Container>
      )}

      {/* Article Content Area */}
      <Container maxWidth="md">
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: "20px", 
            lineHeight: 1.9, 
            color: "#333",
            fontFamily: "inherit",
            "& p": { mb: 4 },
            "& h2": { mt: 8, mb: 4, fontSize: "36px", color: THEME_MAROON, fontWeight: 700 },
            "& h3": { mt: 6, mb: 3, fontSize: "28px", color: THEME_MAROON_LIGHT, fontWeight: 700 },
            "& ul, & ol": { mb: 4, pl: 4 },
            "& li": { mb: 2 },
            "& blockquote": { 
              borderLeft: `8px solid ${THEME_MAROON_LIGHT}`, 
              pl: 5, 
              py: 3, 
              my: 8, 
              fontStyle: "italic",
              fontSize: "28px",
              lineHeight: 1.5,
              bgcolor: THEME_CREAM,
              borderRadius: "0 30px 30px 0",
              color: THEME_MAROON
            },
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: "20px",
              my: 5
            }
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <Divider sx={{ my: 12, borderColor: THEME_CREAM }} />
        
        {/* Call to Action Post-Article */}
        <Box 
          sx={{ 
            textAlign: "center", 
            p: { xs: 6, md: 10 }, 
            bgcolor: THEME_CREAM, 
            borderRadius: "40px",
            boxShadow: "inset 0 0 50px rgba(152, 106, 107, 0.05)"
          }}
        >
          <Typography variant="h2" sx={{ mb: 3, fontSize: { xs: "28px", md: "42px" } }}>
            BRING PEACE TO YOUR SPACE
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: "600px", mx: "auto", color: "#666" }}>
            Experience the resonant power of our handmade singing bowls, 
            crafted with intention and centuries of Himalayan tradition.
          </Typography>
          <Link href="/our-collection" passHref>
            <button className="gradientButton">
              EXPLORE THE COLLECTION
            </button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
