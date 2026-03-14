"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Tooltip,
  Stack,
  Fade,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  ShoppingBagOutlined as BagIcon,
  FavoriteBorder as FavoriteIcon,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { removeFromWishlist } from "@/app/actions/wishlistActions";
import { addToCart } from "@/app/actions/cartActions";
import {
  notifyCartUpdated,
  notifyWishlistUpdated,
} from "@/context/CartWishlistContext";
import Icon from "@/components/ui/icon/Icon";

interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    mainImage: string | null;
  };
}

export default function WishlistContent({ items }: { items: WishlistItem[] }) {
  const handleMoveToCart = async (productId: number, itemId: number) => {
    const cartRes = await addToCart(productId);
    const wishRes = await removeFromWishlist(itemId);
    if (!cartRes.error) notifyCartUpdated();
    if (!wishRes.error) notifyWishlistUpdated();
  };

  if (items.length === 0) {
    return (
      <Fade in={true} timeout={800}>
        <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}>
          <Box
            sx={{
              mb: 4,
              display: "inline-flex",
              p: 3,
              borderRadius: "50%",
              bgcolor: "rgba(192, 113, 122, 0.05)",
            }}
          >
            <FavoriteIcon
              sx={{ fontSize: 80, color: "#C0717A", opacity: 0.5 }}
            />
          </Box>
          <Typography
            variant="h3"
            fontWeight="800"
            gutterBottom
            sx={{ color: "#2D2D2D" }}
          >
            Life is better with items you love.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#606060", mb: 5, maxWidth: "500px", mx: "auto" }}
          >
            Your wishlist is currently empty. Start exploring our unique
            collection and save your favorites for later.
          </Typography>
          <Button
            variant="contained"
            href="/"
            component={Link}
            size="large"
            startIcon={<BagIcon />}
            sx={{
              bgcolor: "#2D2D2D",
              px: 6,
              py: 2,
              borderRadius: 10,
              textTransform: "none",
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#000" },
            }}
          >
            Start Browsing
          </Button>
        </Container>
      </Fade>
    );
  }

  return (
    <Box sx={{ bgcolor: "#FBFBFB", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 6 }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight="900"
              sx={{ color: "#2D2D2D", mb: 1 }}
            >
              My wishlist
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {items.length} {items.length === 1 ? "item" : "items"} saved in
              your collection
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/"
            variant="text"
            sx={{ color: "#C0717A", textTransform: "none", fontWeight: 700 }}
            startIcon={<BagIcon />}
          >
            Continue Shopping
          </Button>
        </Stack>

        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Fade in={true} timeout={400 + index * 100}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid #EAEAEA",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                      border: "1px solid #C0717A",
                    },
                  }}
                >
                  <Box
                    sx={{ position: "relative", pt: "110%", bgcolor: "#fff" }}
                  >
                    <Link href={`/product/${item.product.slug}`}>
                      <Image
                        src={item.product.mainImage || "/placeholder.png"}
                        alt={item.product.name}
                        fill
                        style={{ objectFit: "contain", padding: "20px" }}
                      />
                    </Link>
                    <Tooltip title="Remove item">
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(4px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          "&:hover": { bgcolor: "#FFEDED", color: "#FF4D4D" },
                        }}
                        onClick={async () => {
                          const res = await removeFromWishlist(item.id);
                          if (!res.error) notifyWishlistUpdated();
                        }}
                      >
                        <Icon name="close" width={18} height={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Box sx={{ p: 3, bgcolor: "#fff" }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      href={`/product/${item.product.slug}`}
                      sx={{
                        textDecoration: "none",
                        color: "#2D2D2D",
                        fontWeight: 700,
                        fontSize: "1rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 2,
                        minHeight: "3rem",
                        "&:hover": { color: "#C0717A" },
                      }}
                    >
                      {item.product.name}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CartIcon sx={{ fontSize: 18 }} />}
                      onClick={() => handleMoveToCart(item.product.id, item.id)}
                      sx={{
                        borderRadius: 2,
                        bgcolor: "#F8F9FA",
                        color: "#2D2D2D",
                        boxShadow: "none",
                        textTransform: "none",
                        fontWeight: 700,
                        py: 1.2,
                        "&:hover": {
                          bgcolor: "#2D2D2D",
                          color: "#fff",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
