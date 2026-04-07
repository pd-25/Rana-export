"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  IconButton,
  Divider,
  Grid,
  Fade,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingBagOutlined as BagIcon,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { removeFromCart, updateCartQuantity } from "@/app/actions/cartActions";
import { notifyCartUpdated } from "@/context/CartWishlistContext";
import Icon from "@/components/ui/icon/Icon";
import BackgroundPattern from "@/public/collection/background-pattern.png";

interface CartItem {
  id: number;
  quantity: number;
  variantId: number | null;
  product: {
    id: number;
    sku: string | null;
    modelNo: string | null;
    name: string;
    slug: string;
    mainImage: string | null;
    variants: any[];
  };
}

export default function CartContent({ items }: { items: CartItem[] }) {
  if (items.length === 0) {
    return (
      <Fade in={true} timeout={800}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Box
            sx={{
              mb: 4,
              display: "inline-flex",
              p: 3,
              borderRadius: "50%",
              bgcolor: "rgba(34, 34, 34, 0.05)",
            }}
          >
            <BagIcon sx={{ fontSize: 80, color: "#222", opacity: 0.5 }} />
          </Box>
          <Typography
            variant="h3"
            fontWeight="800"
            gutterBottom
            sx={{ color: "#2D2D2D" }}
          >
            Your cart feels light.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#606060", mb: 5, maxWidth: "500px", mx: "auto" }}
          >
            Explore our collection and find something special. Your future
            favorites are just a click away.
          </Typography>
          <Button
            variant="contained"
            href="/"
            component={Link}
            size="large"
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
            Explore Collection
          </Button>
        </Container>
      </Fade>
    );
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: 10,
        bgcolor: "#F8F9FA", // Consistent non-white base color
      }}
    >
      {/* Mini Hero */}
      <Box
        sx={{
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="900" sx={{ color: "#2D2D2D" }}>
            Shopping Bag
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Review your selection and proceed to checkout
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, pb: 15, pt: 10 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ px: 1 }}
              >
                <Typography variant="h6" fontWeight="700">
                  Cart Items ({items.length})
                </Typography>
                <Button
                  component={Link}
                  href="/"
                  sx={{
                    color: "#C0717A",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Edit Selection
                </Button>
              </Box>

              {items.map((item, index) => (
                <Fade in={true} timeout={400 + index * 100} key={item.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid #EAEAEA",
                      bgcolor: "transparent",
                      transition: "border 0.2s ease",
                      "&:hover": { borderColor: "#C0717A" },
                    }}
                  >
                    <Grid container spacing={3} alignItems="center">
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Box
                          sx={{
                            position: "relative",
                            pt: "100%",
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "transparent",
                            border: "1px solid #F0F0F0",
                          }}
                        >
                          <Link href={`/product/${item.product.slug}`}>
                            <Image
                              src={item.product.mainImage || "/placeholder.png"}
                              alt={item.product.name}
                              fill
                              style={{ objectFit: "contain", padding: "10px" }}
                            />
                          </Link>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 5 }}>
                        <Typography
                          variant="h6"
                          component={Link}
                          href={`/product/${item.product.slug}`}
                          sx={{
                            textDecoration: "none",
                            color: "#2D2D2D",
                            fontWeight: 700,
                            display: "block",
                            mb: 1,
                            "&:hover": { color: "#C0717A" },
                          }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Product SKU: {
                            (() => {
                              const variant = item.product.variants?.find((v: any) => v.id === item.variantId) || item.product.variants?.[0];
                              const data = variant?.data || {};
                              return data.SKU || data.sku || item.product.sku || item.product.modelNo || "N/A";
                            })()
                          }
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent={{
                            xs: "space-between",
                            sm: "flex-end",
                          }}
                          spacing={3}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              bgcolor: "#F8F9FA",
                              borderRadius: 2,
                              p: 0.5,
                              border: "1px solid #EAEAEA",
                            }}
                          >
                            <IconButton
                              size="small"
                              disabled={item.quantity <= 1}
                              onClick={async () => {
                                const res = await updateCartQuantity(
                                  item.id,
                                  item.quantity - 1,
                                );
                                if (!res.error) notifyCartUpdated();
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                minWidth: 32,
                                textAlign: "center",
                                fontWeight: 700,
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={async () => {
                                const res = await updateCartQuantity(
                                  item.id,
                                  item.quantity + 1,
                                );
                                if (!res.error) notifyCartUpdated();
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          <Tooltip title="Remove item">
                            <IconButton
                              color="error"
                              onClick={async () => {
                                const res = await removeFromCart(item.id);
                                if (!res.error) notifyCartUpdated();
                              }}
                              sx={{
                                bgcolor: "rgba(255, 0, 0, 0.05)",
                                "&:hover": { bgcolor: "rgba(255, 0, 0, 0.1)" },
                              }}
                            >
                              <Icon name="close" width={18} height={18} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Paper>
                </Fade>
              ))}
            </Stack>
          </Grid>

          {/* Checkout Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: "sticky", top: 100 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 5,
                  bgcolor: "transparent",
                  border: "1px solid #EAEAEA",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                }}
              >
                <Typography variant="h5" fontWeight="800" sx={{ mb: 4 }}>
                  Order Summary
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography color="textSecondary">Subtotal</Typography>
                    <Typography fontWeight="700">{totalItems} Items</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography color="textSecondary">Shipping</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "success.main", fontWeight: 700 }}
                    >
                      Calculated at next step
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography variant="h6" fontWeight="800">
                      Total Items
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="900"
                      sx={{ color: "#C0717A" }}
                    >
                      {totalItems}
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  component={Link}
                  href="/checkout"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#2D2D2D",
                    color: "#fff",
                    borderRadius: 3,
                    py: 2,
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    mb: 3,
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  Checkout Now
                </Button>

                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      border: "1px dashed #EAEAEA",
                      borderRadius: 3,
                    }}
                  >
                    <Icon name="check" width={20} height={20} />
                    <Typography variant="caption" fontWeight="600">
                      Secure Payment SSL Encrypted
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    href="/"
                    variant="text"
                    fullWidth
                    sx={{ color: "#606060", textTransform: "none" }}
                  >
                    Continue Shopping
                  </Button>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
