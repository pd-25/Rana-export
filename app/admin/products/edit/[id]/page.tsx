import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductFormEdit from "./ProductFormEdit";
import { notFound } from "next/navigation";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { NavigateBefore as BackIcon } from "@mui/icons-material";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) return notFound();

  const product = await (prisma as any).product.findUnique({
    where: { id: productId },
    include: {
      variants: true,
      gallery: true,
      documents: true,
    }
  });

  if (!product) return notFound();

  const categories = await (prisma as any).category.findMany({
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
            Edit Product: {product.name}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
          Edit Product Details
        </Typography>
      </Box>

      <ProductFormEdit categories={categories} product={product} />
    </Box>
  );
}
