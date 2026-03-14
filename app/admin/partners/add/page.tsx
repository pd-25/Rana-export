import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { addDeliveryPartner } from "@/app/actions/deliveryPartnerActions";
import { redirect } from "next/navigation";

export default function AddPartnerPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    await addDeliveryPartner(formData);
    redirect("/admin/partners");
  };

  return (
    <Box maxWidth="sm">
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Add Delivery Partner
      </Typography>

      <Paper elevation={0} sx={{ p: 4, border: "1px solid #eee" }}>
        <form action={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Partner Name"
              name="name"
              placeholder="e.g. DHL, FedEx"
            />
            <TextField
              fullWidth
              label="Contact Info"
              name="contactInfo"
              placeholder="Email or Phone"
            />
            <TextField
              fullWidth
              label="Logo URL"
              name="logo"
              placeholder="https://example.com/logo.png"
            />
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Link
                href="/admin/partners"
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button>Cancel</Button>
              </Link>
              <Button type="submit" variant="contained">
                Save Partner
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
