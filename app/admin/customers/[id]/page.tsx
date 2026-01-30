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
  Avatar,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as AddressIcon,
  ShoppingBag as OrderIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customerId = parseInt(id);
  if (isNaN(customerId)) notFound();

  const customer = await (prisma as any).customer.findUnique({
    where: { id: customerId },
    include: {
      orders: {
        include: {
          _count: {
            select: { items: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { orders: true },
      },
    },
  });

  if (!customer) notFound();

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Link href="/admin/customers" passHref style={{ textDecoration: 'none' }}>
          <Button startIcon={<BackIcon />} variant="outlined" sx={{ borderRadius: 2 }}>
            Back to Customers
          </Button>
        </Link>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Customer: {customer.name}
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        {/* Customer Info Card */}
        <Box>
          <Paper sx={{ p: 3, borderRadius: 3, height: 'fit-content' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.50', color: 'primary.main', mb: 2 }}>
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{customer.name}</Typography>
              <Chip label={`${customer._count.orders} Orders`} size="small" color="primary" sx={{ mt: 1, fontWeight: 700 }} />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon color="action" fontSize="small" />
                <Typography variant="body2">{customer.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon color="action" fontSize="small" />
                <Typography variant="body2">{customer.phone || "No phone provided"}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5 }}>
                <AddressIcon color="action" fontSize="small" sx={{ mt: 0.3 }} />
                <Typography variant="body2">{customer.address || "No address provided"}</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Order History Card */}
        <Box>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <OrderIcon color="action" />
              Order History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                          No orders found for this customer.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    customer.orders.map((order: any) => (
                      <TableRow key={order.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>#{order.id.toString().padStart(5, '0')}</TableCell>
                        <TableCell>{order._count.items} Items</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status} 
                            size="small" 
                            variant="outlined"
                            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                          />
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell align="right">
                          <Link href={`/admin/orders/${order.id}`} passHref>
                            <Button size="small" variant="text">View Order</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
