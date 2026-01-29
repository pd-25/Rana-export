import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductForm from "./ProductForm";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { NavigateBefore as BackIcon } from "@mui/icons-material";

export default async function NewProductPage() {
  const categories = await (prisma as any).category.findMany({
    orderBy: { name: 'asc' }
  });

  const variantGroups = await (prisma as any).variantGroup.findMany({
    include: { items: true },
    orderBy: { name: 'asc' }
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin/products" passHref style={{ textDecoration: 'none' }}>
            <MuiLink
              underline="hover"
              color="primary.main"
              sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 600 }}
              component="span"
            >
              <BackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Products
            </MuiLink>
          </Link>
          <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            New Product Registration
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
          Register New Product
        </Typography>
      </Box>

      <ProductForm categories={categories} variantGroups={variantGroups} />
    </Box>
  );
}
