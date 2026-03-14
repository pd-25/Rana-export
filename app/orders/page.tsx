import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/icon/Icon";

export const metadata = {
  title: "My Orders | Rana Export",
};

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

export default async function UserOrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const orders = await (prisma as any).order.findMany({
    where: { userId: session.userId },
    include: {
      deliveryPartner: true,
      _count: {
        select: { items: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/profile" passHref style={{ textDecoration: "none" }}>
            <Button
              startIcon={<Icon name="arrowLeft" width={16} height={16} />}
              sx={{ color: "#2D2D2D", textTransform: "none", fontWeight: 700 }}
            >
              Back to Profile
            </Button>
          </Link>
          <Typography variant="h3" fontWeight="900" sx={{ color: "#2D2D2D" }}>
            My Orders
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 10,
              textAlign: "center",
              borderRadius: 5,
              border: "1px solid #EAEAEA",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
              You haven't placed any orders yet.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              href="/"
              sx={{
                bgcolor: "#2D2D2D",
                px: 6,
                py: 2,
                borderRadius: 10,
                "&:hover": { bgcolor: "#000" },
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 5,
              border: "1px solid #EAEAEA",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#f1f1f1" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800 }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Items</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Partner</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order: any) => (
                  <TableRow key={order.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>
                      #{order.id.toString().padStart(5, "0")}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order._count.items} Items</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        color={getStatusColor(order.status) as any}
                        sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                      />
                    </TableCell>
                    <TableCell>{order.deliveryPartner?.name || "—"}</TableCell>
                    <TableCell align="right">
                      <Link
                        href={`/orders/${order.id}`}
                        passHref
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            borderColor: "#EAEAEA",
                            color: "#2D2D2D",
                          }}
                        >
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}
