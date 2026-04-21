import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  Avatar,
  Chip,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Schedule as TimeIcon,
} from "@mui/icons-material";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import StatusUpdater from "../StatusUpdater";

export default async function EnquiryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enquiryId = parseInt(id);
  if (isNaN(enquiryId)) notFound();

  const enquiry = await (prisma as any).enquiry.findUnique({
    where: { id: enquiryId },
  });

  if (!enquiry) notFound();

  // Auto-update status to READ if it's NEW
  if (enquiry.status === "NEW") {
    await (prisma as any).enquiry.update({
      where: { id: enquiryId },
      data: { status: "READ" },
    });
    // Update local object for rendering
    enquiry.status = "READ";
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Link href="/admin/enquiries" passHref style={{ textDecoration: "none" }}>
          <Button startIcon={<BackIcon />} variant="outlined" sx={{ borderRadius: 2 }}>
            Back to Enquiries
          </Button>
        </Link>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Enquiry Details
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <StatusUpdater id={enquiry.id} currentStatus={enquiry.status} />
      </Box>

      <Paper sx={{ p: 4, borderRadius: 4, elevation: 2 }}>
        <Box sx={{ display: "flex", gap: 3, mb: 4, alignItems: "flex-start" }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "#8B1E2B", fontSize: "1.5rem" }}>
            {enquiry.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {enquiry.name}
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mt: 1, color: "text.secondary" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">{enquiry.email}</Typography>
              </Box>
              {enquiry.phone && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">{enquiry.phone}</Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <TimeIcon fontSize="small" />
                <Typography variant="body2">
                  {new Date(enquiry.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Chip
            label={enquiry.status}
            color={enquiry.status === "NEW" ? "primary" : "default"}
            sx={{ fontWeight: 700, borderRadius: 1, height: 32 }}
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Subject
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {enquiry.subject || "No Subject provided"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Message
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "#F8F9FA",
              whiteSpace: "pre-wrap",
              minHeight: 200,
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {enquiry.message}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            href={`mailto:${enquiry.email}`}
            variant="contained"
            startIcon={<EmailIcon />}
            sx={{ bgcolor: "#2D2D2D", fontWeight: 700 }}
          >
            Reply via Email
          </Button>
          {enquiry.phone && (
            <Button
              href={`tel:${enquiry.phone}`}
              variant="outlined"
              startIcon={<PhoneIcon />}
              sx={{ fontWeight: 700 }}
            >
              Call Customer
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
