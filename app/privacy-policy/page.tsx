import React from "react";
import { Box, Container, Typography, Paper, Divider } from "@mui/material";

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ bgcolor: "#FBF7F4", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, border: "1px solid #EFCFCE" }}>
          <Typography variant="h2" sx={{ color: "#986A6B", fontWeight: 700, mb: 1, textTransform: "uppercase" }}>
            Privacy Policy
          </Typography>
          <Box sx={{ width: "60px", height: "4px", bgcolor: "#C67E81", mb: 5 }} />

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              Data Collection
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              We collect information that you provide directly to us when you make a purchase, sign up for an account, or contact us. This may include your name, email address, shipping address, and phone number.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              Your data is primarily used to process orders, manage deliveries, and communicate updates regarding your purchases. We do not sell or trade your personal information to third parties.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              Secure Transactions
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              Payment information is processed through secure, industry-standard encrypted gateways. We do not store full credit card details on our servers.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              Cookies
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              We use cookies to improve your browsing experience and remember items in your cart. You can choose to disable cookies through your browser settings.
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
