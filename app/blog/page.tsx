import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import BannerBackground from "@/public/home/home-banner-pic.png";

const THEME_MAROON = "#986A6B";
const THEME_MAROON_LIGHT = "#C67E81";
const THEME_CREAM = "#FFF5F2";

export default async function BlogListPage() {
  const posts = await (prisma as any).blog.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

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
          pb: { xs: 10, md: 35 },
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
          <Box sx={{ textAlign: "center", maxWidth: "800px", mx: "auto" }}>
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontSize: { xs: "40px", md: "64px" },
                letterSpacing: "0.05em",
              }}
            >
              INSIGHTS & HARMONY
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
              sx={{ color: "#444", fontSize: "20px", fontWeight: 300 }}
            >
              Exploring the ancient wisdom of sound healing, Himalayan culture,
              and the art of mindfulness.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: THEME_CREAM,
          height: "100px",
        }}
      />

      {/* Blog List Section */}
      <Box sx={{ my: 5, position: "relative", zIndex: 3 }}>
        <Container sx={{ py: 5 }}>
          {posts.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h5" color="text.secondary">
                Our blog is coming soon. Stay tuned!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {posts.map((post: any) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={post.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "24px",
                      overflow: "hidden",
                      border: "1px solid #eee",
                      boxShadow: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", height: 240 }}>
                      {post.image ? (
                        <CardMedia
                          component="img"
                          image={post.image}
                          alt={post.title}
                          sx={{ height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <Box
                          sx={{
                            height: "100%",
                            bgcolor: THEME_CREAM,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h6" color={THEME_MAROON_LIGHT}>
                            Rana Export
                          </Typography>
                        </Box>
                      )}
                      <Chip
                        label={new Date(post.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" },
                        )}
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "white",
                          fontWeight: 700,
                          color: THEME_MAROON,
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          mb: 2,
                          fontSize: "24px",
                          minHeight: "64px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.6,
                        }}
                      >
                        {post.excerpt || post.content.substring(0, 150) + "..."}
                      </Typography>
                      <Link
                        href={`/blog/${post.slug}`}
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          endIcon="→"
                          sx={{
                            color: THEME_MAROON,
                            fontWeight: 700,
                            minWidth: "auto",
                            px: 0,
                            justifyContent: "flex-start",
                            "&:hover": {
                              bgcolor: "transparent",
                              color: THEME_MAROON_LIGHT,
                            },
                          }}
                        >
                          READ MORE
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}
