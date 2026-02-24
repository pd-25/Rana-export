import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CategoryForm from "@/app/admin/categories/new/CategoryForm";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Container,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { NavigateBefore as BackIcon } from "@mui/icons-material";

export default async function NewCategoryPage() {
  const parents = await (prisma as any).category.findMany({
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
          <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            New Category Registration
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Add New Category
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <CategoryForm parents={parents} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 4, borderRadius: 3, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.100', boxShadow: 'none' }}>
            <Typography variant="h6" color="primary.main" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Quick Tips
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1, flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Names</strong> should be unique and descriptive for your shop.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1, flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Slugs</strong> are automatically generated for URL friendliness.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1, flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Hierarchy</strong>: Select a parent to create a sub-category.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1, flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Visuals</strong>: Upload a high-quality image to represent the category.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
