import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/icon/Icon";

export const metadata = {
  title: "Order Details | Rana Export",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  const { id } = await params;
  const orderId = parseInt(id);

  if (!session) {
    redirect("/login");
  }

  if (isNaN(orderId)) notFound();

  const order = await (prisma as any).order.findUnique({
    where: { id: orderId },
    include: {
      deliveryPartner: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || order.userId !== session.userId) {
    notFound();
  }

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/orders" passHref style={{ textDecoration: "none" }}>
            <Button
              startIcon={<Icon name="arrowLeft" width={16} height={16} />}
              sx={{ color: "#2D2D2D", textTransform: "none", fontWeight: 700 }}
            >
              Back to My Orders
            </Button>
          </Link>
          <Typography variant="h3" fontWeight="900" sx={{ color: "#2D2D2D" }}>
            Order Details
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 5, border: "1px solid #EAEAEA", mb: 4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" fontWeight="800">
                  Order #{order.id.toString().padStart(5, "0")}
                </Typography>
                <Chip
                  label={order.status}
                  color="primary"
                  sx={{ fontWeight: 700 }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>
                        Quantity
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            {item.product.mainImage && (
                              <img
                                src={item.product.mainImage}
                                alt={item.product.name}
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 8,
                                  objectFit: "cover",
                                  border: "1px solid #eee",
                                }}
                              />
                            )}
                            <Box>
                              <Typography variant="subtitle2" fontWeight="700">
                                {item.product.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                SKU: {item.product.sku || "N/A"}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight="700">
                            {item.quantity}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={4}>
              <Paper
                elevation={0}
                sx={{ p: 4, borderRadius: 5, border: "1px solid #EAEAEA" }}
              >
                <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>
                  Shipping Information
                </Typography>
                <Typography variant="subtitle2" fontWeight="700">
                  {order.customerName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  {order.customerPhone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.customerAddress}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" fontWeight="800" sx={{ mb: 2 }}>
                  Logistics
                </Typography>
                <Typography variant="body2" fontWeight="700">
                  Partner:{" "}
                  <span style={{ fontWeight: 500 }}>
                    {order.deliveryPartner?.name || "Not Assigned"}
                  </span>
                </Typography>
                {order.deliveryPartner?.contactInfo && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Contact: {order.deliveryPartner.contactInfo}
                  </Typography>
                )}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 5,
                  bgcolor: "#2D2D2D",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Need Help?
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                  If you have any questions regarding your order, please contact
                  our support team.
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "#fff" }}
                >
                  Contact Support
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
