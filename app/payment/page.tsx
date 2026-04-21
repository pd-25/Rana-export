import React from "react";
import { Box, Container, Typography, Paper, Divider, Stack } from "@mui/material";
import { CreditCard, AccountBalance, LocalAtm } from "@mui/icons-material";

export default function PaymentPage() {
  return (
    <Box sx={{ bgcolor: "#FBF7F4", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, border: "1px solid #EFCFCE" }}>
          <Typography variant="h2" sx={{ color: "#986A6B", fontWeight: 700, mb: 1, textTransform: "uppercase" }}>
            Payment Methods
          </Typography>
          <Box sx={{ width: "60px", height: "4px", bgcolor: "#C67E81", mb: 5 }} />

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#986A6B" }}>
              Secure Payment Options
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8, mb: 4 }}>
              We offer multiple secure ways to pay for your handcrafted orders. Choose the method that is most convenient for you.
            </Typography>

            <Stack spacing={3}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, display: "flex", alignItems: "center", gap: 3, bgcolor: "#fff" }}>
                <CreditCard sx={{ fontSize: 40, color: "#986A6B" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Credit & Debit Cards</Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>We accept Visa, Mastercard, American Express, and RuPay.</Typography>
                </Box>
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, display: "flex", alignItems: "center", gap: 3, bgcolor: "#fff" }}>
                <AccountBalance sx={{ fontSize: 40, color: "#986A6B" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Bank Transfers (NEFT/RTGS)</Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>Recommended for wholesale orders and custom commissions.</Typography>
                </Box>
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, display: "flex", alignItems: "center", gap: 3, bgcolor: "#fff" }}>
                <LocalAtm sx={{ fontSize: 40, color: "#986A6B" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Digital Wallets</Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>Support for UPI, Google Pay, and other major digital payment systems.</Typography>
                </Box>
              </Paper>
            </Stack>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              Security Assurance
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              Your payment security is our top priority. All transactions are handled via 256-bit SSL encryption to ensure your financial data remains private and protected.
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
