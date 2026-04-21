import React from "react";
import { Box, Container, Typography, Paper, Divider } from "@mui/material";

export default function TermsConditionsPage() {
  return (
    <Box sx={{ bgcolor: "#FBF7F4", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, border: "1px solid #EFCFCE" }}>
          <Typography variant="h2" sx={{ color: "#986A6B", fontWeight: 700, mb: 1, textTransform: "uppercase" }}>
            Terms & Conditions
          </Typography>
          <Box sx={{ width: "60px", height: "4px", bgcolor: "#C67E81", mb: 5 }} />

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              1. Introduction
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              Welcome to Rana Export. By accessing our website and purchasing our handcrafted products, you agree to comply with and be bound by the following terms and conditions.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              2. Handcrafted Variations
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              Please note that as our products (Singing Bowls, Bells, Gongs) are handmade, slight variations in color, weight, and tone are natural and should be celebrated as a mark of authenticity.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              3. Ordering & Payments
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              All orders are subject to availability. Payments must be made in full through our authorized payment gateways or negotiated bank transfers for wholesale orders.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              4. Return & Exchange
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              Due to the nature of handmade artifacts, we offer exchanges only in the case of manufacturing defects or damage during transit clearly reported within 48 hours of delivery.
            </Typography>
          </Box>

          <Divider sx={{ my: 4, borderColor: "#EFCFCE" }} />

          <Typography variant="body2" sx={{ color: "#999", textAlign: "center" }}>
            Last Updated: January 2025
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
