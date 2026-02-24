import React from "react";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions";
import Link from "next/link";
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
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as ProductIcon,
} from "@mui/icons-material";

import ProductFilters from "./ProductFilters";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category } = await searchParams;

  const categories = await (prisma as any).category.findMany({
    orderBy: { name: "asc" },
  });

  const products = await (prisma as any).product.findMany({
    where: {
      AND: [
        search ? { name: { contains: search } } : {},
        category && category !== "all" ? { categoryId: parseInt(category) } : {},
      ],
    },
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.5px" }}>
            Products
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your store inventory and product details
          </Typography>
        </Box>
        <Link href="/admin/products/new" passHref style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: "0 4px 14px 0 rgba(25, 118, 210, 0.39)",
            }}
          >
            Add New Product
          </Button>
        </Link>
      </Box>

      <ProductFilters categories={categories} />

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid", borderColor: "divider" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", pl: 4 }}>
                PRODUCT
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary" }}>CATEGORY</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary" }}>VARIANTS</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary" }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", pr: 4 }}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((prod: any) => (
              <TableRow key={prod.id} hover>
                <TableCell sx={{ pl: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={prod.mainImage}
                      variant="rounded"
                      sx={{ width: 48, height: 48, bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}
                    >
                      <ProductIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {prod.name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={prod.category.name}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1, fontSize: "0.75rem" }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {prod.variants.length} Variants
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={prod.isActive ? "Live" : "Draft"}
                    size="small"
                    color={prod.isActive ? "success" : "default"}
                    sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ pr: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Link href={`/admin/products/edit/${prod.id}`} passHref>
                      <IconButton size="small" sx={{ color: "primary.main", bgcolor: "primary.50" }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProduct(prod.id);
                      }}
                    >
                      <IconButton type="submit" size="small" sx={{ color: "error.main", bgcolor: "error.50" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </form>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
