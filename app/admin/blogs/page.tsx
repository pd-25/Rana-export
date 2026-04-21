import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteBlogButton from "./DeleteBlogButton";
import StatusToggle from "./StatusToggle";

export default async function BlogsAdminPage() {
  const blogs = await (prisma as any).blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Blog Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your website's news and educational content
          </Typography>
        </Box>
        <Link href="/admin/blogs/new" passHref>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ 
              borderRadius: 2, 
              bgcolor: "#2D2D2D", 
              fontWeight: 700, 
              px: 3,
              "&:hover": { bgcolor: "#000" }
            }}
          >
            Create New Post
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, elevation: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#F8F9FA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Post</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No blog posts found. Create your first post!</Typography>
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog: any) => (
                <TableRow key={blog.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {blog.image && (
                        <Box
                          component="img"
                          src={blog.image}
                          sx={{ width: 40, height: 40, borderRadius: 1, objectFit: "cover" }}
                        />
                      )}
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {blog.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                          /{blog.slug}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{blog.author || "Admin"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusToggle id={blog.id} isActive={blog.isActive} />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Link href={`/blog/${blog.slug}`} target="_blank" passHref>
                        <Tooltip title="View Frontend">
                          <IconButton size="small" color="info">
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link href={`/admin/blogs/edit/${blog.id}`} passHref>
                        <Tooltip title="Edit Post">
                          <IconButton size="small" color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <DeleteBlogButton id={blog.id} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
