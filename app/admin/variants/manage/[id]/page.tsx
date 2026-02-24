import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ManageItemsClient from "./ManageItemsClient";
import { Box, Typography, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { NavigateBefore as BackIcon } from "@mui/icons-material";
import Link from "next/link";

export default async function ManageVariantItemsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const groupId = parseInt(id);

  if (isNaN(groupId)) return notFound();

  const group = await (prisma as any).variantGroup.findUnique({
    where: { id: groupId },
    include: { items: true }
  });

  if (!group) return notFound();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link href="/admin/variants" passHref style={{ textDecoration: 'none' }}>
            <MuiLink underline="hover" color="primary" sx={{ display: 'flex', alignItems: 'center' }} component="span">
              <BackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Variant Groups
            </MuiLink>
          </Link>
          <Typography color="text.secondary">Manage Items</Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {group.name}: Manage Variant Items
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Define the default rows (options) for this variant group.
        </Typography>
      </Box>

      <ManageItemsClient group={group} />
    </Box>
  );
}
