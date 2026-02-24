import React from "react";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Link from "next/link";
import VariantGroupList from "./VariantGroupList";

export default async function VariationsPage() {
  const groups = await (prisma as any).variantGroup.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
            Variant Groups
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create reusable variant templates for your products (e.g. Bowls weight/size group)
          </Typography>
        </Box>
        <Link href="/admin/variants/new" passHref style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2, px: 3, py: 1 }}
          >
            Create New Group
          </Button>
        </Link>
      </Box>

      <VariantGroupList groups={groups} />
    </Box>
  );
}
