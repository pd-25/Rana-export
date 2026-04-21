import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteEnquiryButton from "./DeleteEnquiryButton";

export default async function EnquiriesAdminPage() {
  const enquiries = await (prisma as any).enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Customer Enquiries
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Enquiries: {enquiries.length}
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, elevation: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#F8F9FA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No enquiries found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              enquiries.map((enquiry: any) => (
                <TableRow key={enquiry.id} hover>
                  <TableCell>
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {enquiry.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ opacity: 0.7 }}>
                        <EmailIcon sx={{ fontSize: 14 }} />
                        <Typography variant="caption">{enquiry.email}</Typography>
                      </Stack>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {enquiry.subject || "No Subject"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={enquiry.status}
                      size="small"
                      color={enquiry.status === "NEW" ? "primary" : "default"}
                      sx={{ fontWeight: 600, borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Link href={`/admin/enquiries/${enquiry.id}`} passHref>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <DeleteEnquiryButton id={enquiry.id} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
