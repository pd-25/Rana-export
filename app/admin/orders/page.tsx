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
  Chip,
  IconButton,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  ShoppingBag as OrderIcon,
} from "@mui/icons-material";
import Link from "next/link";

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return "success";
    case "SHIPPED":
      return "info";
    case "PROCESSING":
      return "warning";
    case "CANCELLED":
      return "error";
    default:
      return "default";
  }
};

export default async function OrdersPage() {
  const orders = await (prisma as any).order.findMany({
    include: {
      customer: true,
      user: true,
      deliveryPartner: true,
      _count: {
        select: { items: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: "-0.5px",
          }}
        >
          Orders
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track and manage customer orders
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  pl: 4,
                }}
              >
                ORDER ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              >
                CUSTOMER
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              >
                ITEMS
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              >
                PARTNER
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              >
                STATUS
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              >
                DATE
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  pr: 4,
                }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ pl: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    #{order.id.toString().padStart(5, "0")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {order.customerName ||
                      order.user?.name ||
                      order.customer?.name ||
                      "Guest"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.customerPhone || order.customer?.phone || "No Phone"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order._count.items} Items
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {order.deliveryPartner?.name || "—"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    color={getStatusColor(order.status) as any}
                    sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ pr: 4 }}>
                  <Link href={`/admin/orders/${order.id}`} passHref>
                    <IconButton
                      size="small"
                      sx={{ color: "primary.main", bgcolor: "primary.50" }}
                    >
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
