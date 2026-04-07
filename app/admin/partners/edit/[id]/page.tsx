import React from "react";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Link from "next/link";
import { updateDeliveryPartner } from "@/app/actions/deliveryPartnerActions";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt((await params).id);
  const partner = await (prisma as any).deliveryPartner.findUnique({
    where: { id },
  });

  if (!partner) {
    notFound();
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    await updateDeliveryPartner(id, formData);
    redirect("/admin/partners");
  };

  return (
    <Box maxWidth="sm">
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Edit Shipping Mode
      </Typography>

      <Paper elevation={0} sx={{ p: 4, border: "1px solid #eee" }}>
        <form action={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Mode Name"
              name="name"
              defaultValue={partner.name}
            />
            <TextField
              fullWidth
              label="Contact Info"
              name="contactInfo"
              defaultValue={partner.contactInfo || ""}
            />
            <TextField
              fullWidth
              label="Logo URL"
              name="logo"
              defaultValue={partner.logo || ""}
            />
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  value="true"
                  defaultChecked={partner.isActive}
                />
              }
              label="Is Active"
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
                Update Mode
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
