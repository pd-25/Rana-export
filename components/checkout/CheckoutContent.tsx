"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
  Avatar,
  Fade,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  LocalShippingOutlined as ShippingIcon,
  CheckCircleOutline as SuccessIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { placeOrder } from "@/app/actions/orderActions";
import { notifyCartUpdated } from "@/context/CartWishlistContext";
import Link from "next/link";

interface CheckoutContentProps {
  cartItems: any[];
  partners: any[];
  initialUser?: { name: string | null; email: string } | null;
}

export default function CheckoutContent({
  cartItems,
  partners,
  initialUser,
}: CheckoutContentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await placeOrder(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess("Your order has been placed successfully!");
      notifyCartUpdated();
      // Keep loading true to prevent multiple clicks while success screen shows
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 15, textAlign: "center" }}>
        <Fade in={true}>
          <Box>
            <SuccessIcon sx={{ fontSize: 100, color: "success.main", mb: 4 }} />
            <Typography variant="h3" fontWeight="900" gutterBottom>
              Thank You!
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 5 }}>
              Your order has been placed and is being processed.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              href="/profile"
              size="large"
              sx={{
                bgcolor: "#2D2D2D",
                px: 6,
                py: 2,
                borderRadius: 10,
                "&:hover": { bgcolor: "#000" },
              }}
            >
              View My Orders
            </Button>
          </Box>
        </Fade>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{ mb: 6, color: "#2D2D2D" }}
        >
          Checkout
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={4}>
                {/* Shipping Information */}
                <Paper
                  elevation={0}
                  sx={{ p: 4, borderRadius: 5, border: "1px solid #EAEAEA" }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      mb: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <ShippingIcon /> Shipping Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label="Full Name"
                        name="name"
                        variant="outlined"
                        defaultValue={initialUser?.name || ""}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        required
                        fullWidth
                        type="email"
                        label="Email Address"
                        name="email"
                        variant="outlined"
                        defaultValue={initialUser?.email || ""}
                        helperText="For order updates"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        required
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        required
                        fullWidth
                        label="Complete Address"
                        name="address"
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Paper>

                {/* Delivery Partner */}
                <Paper
                  elevation={0}
                  sx={{ p: 4, borderRadius: 5, border: "1px solid #EAEAEA" }}
                >
                  <Typography variant="h5" fontWeight="800" sx={{ mb: 4 }}>
                    Choose Delivery Partner
                  </Typography>
                  <FormControl fullWidth required>
                    <InputLabel>Delivery Partner</InputLabel>
                    <Select
                      name="deliveryPartnerId"
                      label="Delivery Partner"
                      defaultValue=""
                    >
                      {partners.map((partner) => (
                        <MenuItem key={partner.id} value={partner.id}>
                          {partner.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Paper>
              </Stack>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ position: "sticky", top: 100 }}>
                <Paper
                  elevation={0}
                  sx={{ p: 4, borderRadius: 5, border: "1px solid #EAEAEA" }}
                >
                  <Typography variant="h5" fontWeight="800" sx={{ mb: 4 }}>
                    Order Summary
                  </Typography>

                  <Stack
                    spacing={2}
                    sx={{ mb: 4, maxHeight: "300px", overflowY: "auto", pr: 1 }}
                  >
                    {cartItems.map((item) => (
                      <Box
                        key={item.id}
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #eee",
                            bgcolor: "#fff",
                          }}
                        >
                          <Image
                            src={item.product.mainImage || "/placeholder.png"}
                            alt={item.product.name}
                            fill
                            style={{ objectFit: "contain", padding: "5px" }}
                          />
                        </Box>
                        <Box flex={1}>
                          <Typography
                            variant="body2"
                            fontWeight="700"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.product.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 4,
                    }}
                  >
                    <Typography variant="h6" fontWeight="800">
                      Total Items
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="900"
                      sx={{ color: "#C0717A" }}
                    >
                      {totalItems}
                    </Typography>
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      bgcolor: "#2D2D2D",
                      color: "#fff",
                      borderRadius: 3,
                      py: 2,
                      textTransform: "none",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                      "&:hover": { bgcolor: "#000" },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ mt: 3, display: "block", textAlign: "center" }}
                  >
                    By placing your order, you agree to our terms and
                    conditions.
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
