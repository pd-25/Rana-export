import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
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
  Tooltip,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

export default async function HomepageSettingsPage() {
  const sections = await (prisma as any).homeSection.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.5px",
            }}
          >
            Homepage Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your homepage content sections, images, and videos
          </Typography>
        </Box>
      </Box>

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
                  pl: 4,
                }}
              >
                SECTION NAME
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              >
                TITLE
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
                align="right"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  pr: 4,
                }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((section: any) => (
              <TableRow key={section.id} hover>
                <TableCell sx={{ pl: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <HomeIcon color="primary" />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                      {section.section.replace('_', ' ')}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {section.title || "No Title"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={section.isActive ? "Published" : "Hidden"}
                    size="small"
                    color={section.isActive ? "success" : "default"}
                    sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ pr: 4 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    <Link href={`/admin/homepage/${section.id}/edit`} passHref>
                      <Tooltip title="Edit Section">
                        <IconButton
                          size="small"
                          sx={{ color: "primary.main", bgcolor: "primary.50" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Link>
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
