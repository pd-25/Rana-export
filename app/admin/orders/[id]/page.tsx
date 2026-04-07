import React from "react";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Person as PersonIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { notFound } from "next/navigation";
import StatusUpdate from "./StatusUpdate";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = parseInt(id);
  if (isNaN(orderId)) notFound();

  const order = await (prisma as any).order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      user: true,
      deliveryPartner: true,
      items: {
        include: {
          product: {
            include: {
              variants: true,
            },
          },
        },
      },
    },
  });

  if (!order) notFound();

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Link href="/admin/orders" passHref style={{ textDecoration: "none" }}>
          <Button
            startIcon={<BackIcon />}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Back to Orders
          </Button>
        </Link>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Order #{order.id.toString().padStart(5, "0")}
        </Typography>
        <Chip label={order.status} color="primary" sx={{ fontWeight: 700 }} />
        <Box sx={{ flexGrow: 1 }} />
        <StatusUpdate orderId={order.id} currentStatus={order.status} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        <Box>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Order Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          {item.product.mainImage && (
                            <img
                              src={item.product.mainImage}
                              alt={item.product.name}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 4,
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <Box>
                            <Typography variant="subtitle2">
                              {item.product.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              SKU: {
                                (() => {
                                  const variant = item.product.variants?.find((v: any) => v.id === item.variantId) || item.product.variants?.[0];
                                  const data = variant?.data || {};
                                  return data.SKU || data.sku || item.product.sku || item.product.modelNo || "N/A";
                                })()
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        <Box>
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <PersonIcon color="action" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Customer Details
              </Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {order.customerName ||
                order.user?.name ||
                order.customer?.name ||
                "Guest"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.customerEmail ||
                order.user?.email ||
                order.customer?.email ||
                "No Email"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.customerPhone || order.customer?.phone || "No Phone"}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <ShippingIcon color="action" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Shipping Address
              </Typography>
            </Box>
            <Typography variant="body2">
              {order.customerAddress ||
                order.customer?.address ||
                "No address provided"}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <ShippingIcon color="action" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Logistics
              </Typography>
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Partner: {order.deliveryPartner?.name || "Not assigned"}
            </Typography>
            {order.deliveryPartner?.contactInfo && (
              <Typography variant="body2" color="text.secondary">
                Contact: {order.deliveryPartner.contactInfo}
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
