import React from "react";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { deleteDeliveryPartner } from "@/app/actions/deliveryPartnerActions";

export default async function DeliveryPartnersPage() {
  const partners = await (prisma as any).deliveryPartner.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          Delivery Partners
        </Typography>
        <Link
          href="/admin/partners/add"
          passHref
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Partner
          </Button>
        </Link>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #eee" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners.map((partner: any) => (
              <TableRow key={partner.id}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {partner.name}
                </TableCell>
                <TableCell>{partner.contactInfo || "N/A"}</TableCell>
                <TableCell>
                  <Chip
                    label={partner.isActive ? "Active" : "Inactive"}
                    color={partner.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Link href={`/admin/partners/edit/${partner.id}`} passHref>
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteDeliveryPartner(partner.id);
                      }}
                    >
                      <IconButton size="small" color="error" type="submit">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </form>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
