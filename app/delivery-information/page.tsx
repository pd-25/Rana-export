import React from "react";
import { Box, Container, Typography, Paper, Divider } from "@mui/material";

export default function DeliveryInformationPage() {
  return (
    <Box sx={{ bgcolor: "#FBF7F4", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, border: "1px solid #EFCFCE" }}>
          <Typography variant="h2" sx={{ color: "#986A6B", fontWeight: 700, mb: 1, textTransform: "uppercase" }}>
            Delivery Information
          </Typography>
          <Box sx={{ width: "60px", height: "4px", bgcolor: "#C67E81", mb: 5 }} />

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              Shipping Policy
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8, mb: 3 }}>
              At Rana Export, we understand the delicate nature of our handcrafted singing bowls and antique items. Every order is packed with the utmost care using premium protective materials to ensure safe transit to your doorstep.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              Delivery Timelines
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8, mb: 2 }}>
              • <strong>Domestic (India):</strong> 5-7 business days.<br />
              • <strong>International:</strong> 12-15 business days depending on customs clearance.<br />
            </Typography>
            <Typography variant="body1" sx={{ color: "#666", fontSize: "15px" }}>
              *Please note that for bulk orders or custom handcrafted sets, production time may vary. Our team will keep you informed throughout the crafting process.
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#986A6B" }}>
              Tracking Your Order
            </Typography>
            <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.8 }}>
              Once your order is dispatched, you will receive a tracking ID via email and SMS. You can monitor the progress of your shipment through our logistics partners' websites.
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
