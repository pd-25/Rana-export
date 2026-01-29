"use client";
import React from "react";
import {
  Grid,
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
  IconButton,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  MoreVert,
  Category as CategoryIcon,
  Inventory as ProductIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import Link from "next/link";

const stats = [
  {
    title: "Total Sales",
    value: "$24,500",
    icon: <AttachMoney />,
    color: "#2e7d32",
    bg: "#e8f5e9",
  },
  {
    title: "New Orders",
    value: "125",
    icon: <ShoppingCart />,
    color: "#0288d1",
    bg: "#e1f5fe",
  },
  {
    title: "Total Customers",
    value: "842",
    icon: <People />,
    color: "#ed6c02",
    bg: "#fff3e0",
  },
  {
    title: "Growth",
    value: "+12%",
    icon: <TrendingUp />,
    color: "#9c27b0",
    bg: "#f3e5f5",
  },
];

const recentTransactions = [
  { id: 1, name: "Modern Portfolio", date: "Jan 24, 2026", status: "Completed", amount: "$89.00" },
  { id: 2, name: "E-commerce Pro", date: "Jan 23, 2026", status: "Pending", amount: "$129.00" },
  { id: 3, name: "Minimalist Blog", date: "Jan 22, 2026", status: "Completed", amount: "$45.00" },
];

export default function AdminDashboard() {
  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>
        <Button variant="contained" startIcon={<TrendingUp />}>
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
            <Card sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
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
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Recent Transactions
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#fafafa" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Template</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentTransactions.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                    <TableCell color="text.secondary">{row.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={row.status === "Completed" ? "success" : "warning"}
                        variant="filled"
                        sx={{
                          fontWeight: 600,
                          bgcolor: row.status === "Completed" ? "#e8f5e9" : "#fff3e0",
                          color: row.status === "Completed" ? "#2e7d32" : "#ed6c02",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid", borderColor: "divider" }}>
            <List sx={{ p: 1 }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton 
                  component={Link} 
                  href="/admin/categories"
                  sx={{ 
                    borderRadius: 1.5,
                    "&:hover": { bgcolor: "primary.50", color: "primary.main" }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    <CategoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Manage Categories" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton 
                  component={Link} 
                  href="/admin/products"
                  sx={{ 
                    borderRadius: 1.5,
                    "&:hover": { bgcolor: "primary.50", color: "primary.main" }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    <ProductIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Manage Products" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  component={Link} 
                  href="/"
                  sx={{ 
                    borderRadius: 1.5,
                    "&:hover": { bgcolor: "primary.50", color: "primary.main" }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="View Live Site" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
