import React from "react";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
} from "@mui/material";
import {
  ShoppingCart,
  People,
  Category as CategoryIcon,
  Inventory as ProductIcon,
  Dashboard as DashboardIcon,
  Straighten as StraightenIcon,
  Visibility as ViewIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import Link from "next/link";

export default async function AdminDashboard() {
  const [productCount, categoryCount, customerCount, orderCount, recentOrders] =
    await Promise.all([
      (prisma as any).product.count(),
      (prisma as any).category.count(),
      (prisma as any).user.count({ where: { role: "USER" } }),
      (prisma as any).order.count(),
      (prisma as any).order.findMany({
        take: 5,
        include: { customer: true, user: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const stats = [
    {
      title: "Total Products",
      value: productCount,
      icon: <ProductIcon />,
      color: "#2e7d32",
      bg: "#e8f5e9",
      path: "/admin/products",
    },
    {
      title: "Total Categories",
      value: categoryCount,
      icon: <CategoryIcon />,
      color: "#0288d1",
      bg: "#e1f5fe",
      path: "/admin/categories",
    },
    {
      title: "Total Customers",
      value: customerCount,
      icon: <People />,
      color: "#ed6c02",
      bg: "#fff3e0",
      path: "/admin/customers",
    },
    {
      title: "Total Orders",
      value: orderCount,
      icon: <ShoppingCart />,
      color: "#9c27b0",
      bg: "#f3e5f5",
      path: "/admin/orders",
    },
  ];

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
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor your store metrics and manage recent activities
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((stat) => (
          <Box key={stat.title}>
            <Link href={stat.path} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: stat.bg,
                      color: stat.color,
                      mr: 2,
                      display: "flex",
                    }}
                  >
                    {React.cloneElement(stat.icon as React.ReactElement<any>, {
                      fontSize: "medium",
                    })}
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ShoppingCart fontSize="small" color="action" />
            Recent Orders
          </Typography>
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
                    }}
                  >
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No orders yet
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order: any) => (
                    <TableRow key={order.id} hover>
                      <TableCell sx={{ fontWeight: 700 }}>
                        #{order.id.toString().padStart(5, "0")}
                      </TableCell>
                      <TableCell>
                        {order.customerName ||
                          order.user?.name ||
                          order.customer?.name ||
                          "Guest"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          color={getStatusColor(order.status) as any}
                          sx={{ fontWeight: 700, fontSize: "0.65rem" }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                      >
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Link href={`/admin/orders/${order.id}`} passHref>
                          <IconButton size="small" color="primary">
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Link href="/admin/orders" style={{ textDecoration: "none" }}>
              <Button size="small" endIcon={<ViewIcon fontSize="small" />}>
                View All Orders
              </Button>
            </Link>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DashboardIcon fontSize="small" color="action" />
            Quick Management
          </Typography>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <List sx={{ p: 1 }}>
              {[
                {
                  title: "Manage Products",
                  icon: <ProductIcon />,
                  path: "/admin/products",
                },
                {
                  title: "Manage Categories",
                  icon: <CategoryIcon />,
                  path: "/admin/categories",
                },
                {
                  title: "Manage Customers",
                  icon: <People />,
                  path: "/admin/customers",
                },
                {
                  title: "Manage Orders",
                  icon: <ShoppingCart />,
                  path: "/admin/orders",
                },
                {
                  title: "Variant Groups",
                  icon: <StraightenIcon />,
                  path: "/admin/variants",
                },
                {
                  title: "Shipping Modes",
                  icon: <ShippingIcon />,
                  path: "/admin/partners",
                },
              ].map((item) => (
                <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
                  <Link
                    href={item.path}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      color: "inherit",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        borderRadius: 1.5,
                        "&:hover": {
                          bgcolor: "primary.50",
                          color: "primary.main",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                        {React.cloneElement(
                          item.icon as React.ReactElement<any>,
                          { fontSize: "small" },
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
