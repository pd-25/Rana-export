import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CategoryFormEdit from "@/app/admin/categories/edit/[id]/CategoryFormEdit";
import { notFound } from "next/navigation";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
  Paper,
} from "@mui/material";
import { NavigateBefore as BackIcon } from "@mui/icons-material";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) return notFound();

  const category = await (prisma as any).category.findUnique({
    where: { id: categoryId }
  });

  if (!category) return notFound();

  const parents = await (prisma as any).category.findMany({
    where: { id: { not: categoryId } },
    select: { id: true, name: true, parentId: true },
    orderBy: { name: 'asc' }
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin/categories" passHref style={{ textDecoration: 'none' }}>
            <MuiLink
              underline="hover"
              color="primary.main"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '0.875rem',
                fontWeight: 600
              }}
              component="span"
            >
              <BackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Categories
            </MuiLink>
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.875rem' }}>
            Edit Category
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Edit Category: {category.name}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <CategoryFormEdit category={category} parents={parents} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
