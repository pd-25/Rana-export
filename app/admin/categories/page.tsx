import React from "react";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "./actions";
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
  FolderOpen as FolderIcon,
  SubdirectoryArrowRight as SubIcon,
} from "@mui/icons-material";

export default async function CategoriesPage() {
  const allCategories = await (prisma as any).category.findMany({
    include: {
      parent: true,
    },
    orderBy: { name: 'asc' }
  });

  // Recursive function to build a flattened tree structure with depth indicators
  const buildFlatTree = (items: any[], parentId: number | null = null, depth: number = 0): any[] => {
    const result: any[] = [];
    const children = items.filter(item => item.parentId === parentId);
    
    children.forEach(child => {
      result.push({ ...child, depth });
      // Recursively add children of this item
      const grandchildren = buildFlatTree(items, child.id, depth + 1);
      result.push(...grandchildren);
    });
    
    return result;
  };

  const structuredCategories = buildFlatTree(allCategories);

  // Safety: Add any abandoned categories (where parentId is set but parent doesn't exist)
  allCategories.forEach((cat: any) => {
    if (!structuredCategories.find(c => c.id === cat.id)) {
      structuredCategories.push({ ...cat, depth: 0, isAbandoned: true });
    }
  });

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.5px", mb: 0.5 }}>
            Categories
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your store hierarchy and product groupings
          </Typography>
        </Box>
        <Link href="/admin/categories/new" passHref style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ 
              borderRadius: 2, 
              px: 3, 
              py: 1.2,
              fontWeight: 700,
              boxShadow: "0 4px 14px 0 rgba(25, 118, 210, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(25, 118, 210, 0.2)",
              }
            }}
          >
            Create Category
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid", borderColor: "divider", overflow: 'hidden' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, fontSize: "0.7rem", color: "text.secondary", pl: 4, textTransform: 'uppercase' }}>Name & Classification</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "0.7rem", color: "text.secondary", textTransform: 'uppercase' }}>URL Slug</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "0.7rem", color: "text.secondary", textTransform: 'uppercase' }}>Hierarchy Mapping</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: "0.7rem", color: "text.secondary", textTransform: 'uppercase' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, fontSize: "0.7rem", color: "text.secondary", pr: 4, textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {structuredCategories.map((cat: any) => (
              <TableRow 
                key={cat.id} 
                hover 
                sx={{ 
                  bgcolor: cat.depth > 0 ? `rgba(25, 118, 210, ${Math.min(0.02 * cat.depth, 0.08)})` : "inherit",
                  "&:last-child td, &:last-child th": { border: 0 } 
                }}
              >
                <TableCell sx={{ pl: 4 + (cat.depth * 4) }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                    {cat.depth > 0 && (
                      <SubIcon 
                        sx={{ 
                          color: 'primary.light', 
                          fontSize: 20,
                          opacity: 1 / cat.depth,
                          ml: (cat.depth - 1) * 0.5 
                        }} 
                      />
                    )}
                    <Avatar
                      src={cat.image}
                      variant="rounded"
                      sx={{ 
                        width: cat.depth > 0 ? 40 : 52, 
                        height: cat.depth > 0 ? 40 : 52, 
                        bgcolor: 'background.default', 
                        border: "1px solid", 
                        borderColor: "divider",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.03)"
                      }}
                    >
                      <FolderIcon sx={{ color: 'text.secondary', fontSize: cat.depth > 0 ? 20 : 24 }} />
                    </Avatar>
                    <Box>
                      <Typography variant={cat.depth > 0 ? "body2" : "subtitle1"} sx={{ fontWeight: 700, lineHeight: 1.2, color: "text.primary" }}>
                        {cat.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Typography variant="caption" sx={{ 
                          fontSize: '0.6rem', 
                          fontWeight: 800, 
                          color: cat.depth === 0 ? "primary.main" : "text.secondary",
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {cat.depth === 0 ? "Root Category" : `Level ${cat.depth} Sub`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.85rem', bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1, width: 'fit-content' }}>
                    /{cat.slug}
                  </Typography>
                </TableCell>
                <TableCell>
                  {cat.parent ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, fontSize: '0.7rem' }}>PARENT:</Typography>
                      <Chip 
                        label={cat.parent.name} 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          borderRadius: 1.5, 
                          fontSize: "0.75rem", 
                          fontWeight: 700,
                          borderColor: "primary.100",
                          color: "primary.main",
                          bgcolor: "primary.50",
                          height: 24
                        }} 
                      />
                    </Box>
                  ) : (
                    <Chip 
                      label="PRIMARY CATEGORY" 
                      size="small" 
                      sx={{ 
                        borderRadius: 1.5, 
                        fontSize: "0.65rem", 
                        fontWeight: 800,
                        bgcolor: "grey.100",
                        color: "grey.600",
                        height: 24,
                        border: '1px dashed',
                        borderColor: 'grey.300'
                      }} 
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={cat.isActive ? "Published" : "Draft"}
                    size="small"
                    color={cat.isActive ? "success" : "default"}
                    sx={{ 
                      fontWeight: 800, 
                      fontSize: '0.65rem', 
                      height: 24, 
                      borderRadius: 1.5,
                      textTransform: 'uppercase',
                      bgcolor: cat.isActive ? undefined : "grey.100",
                      color: cat.isActive ? undefined : "text.disabled"
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ pr: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Link href={`/admin/categories/edit/${cat.id}`} passHref>
                      <Tooltip title="Modify Details">
                        <IconButton
                          size="small"
                          sx={{ color: 'primary.main', bgcolor: 'primary.50', boxShadow: '0 2px 4px rgba(25, 118, 210, 0.1)', "&:hover": { bgcolor: "primary.100" } }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteCategory(cat.id);
                    }}>
                      <Tooltip title="Remove Category">
                        <IconButton
                          type="submit"
                          size="small"
                          sx={{ color: 'error.main', bgcolor: 'error.50', boxShadow: '0 2px 4px rgba(211, 47, 47, 0.1)', "&:hover": { bgcolor: "error.100" } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </form>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {structuredCategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 15 }}>
                  <Box sx={{ opacity: 0.3, mb: 2 }}>
                    <FolderIcon sx={{ fontSize: 80, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
                    Empty Registry
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    No categories have been registered yet.
                  </Typography>
                  <Link href="/admin/categories/new" passHref style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" startIcon={<AddIcon />}>
                      Create Your First Category
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
