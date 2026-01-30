import React from "react";
import { prisma } from "@/lib/prisma";
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
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import Link from "next/link";

export default async function CustomersPage() {
  const customers = await (prisma as any).customer.findMany({
    include: {
      _count: {
        select: { orders: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.5px" }}>
          Customers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your customer database and view their purchase history
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", pl: 4 }}>CUSTOMER</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary" }}>EMAIL</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary" }}>PHONE</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary" }}>ORDERS</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary" }}>JOINED</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", pr: 4 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer: any) => (
              <TableRow key={customer.id} hover>
                <TableCell sx={{ pl: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {customer.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{customer.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{customer.phone || "—"}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {customer._count.orders} Orders
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ pr: 4 }}>
                  <Link href={`/admin/customers/${customer.id}`} passHref>
                    <IconButton size="small" sx={{ color: 'primary.main', bgcolor: 'primary.50' }}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </Link>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
