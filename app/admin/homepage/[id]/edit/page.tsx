import React from "react";
import { prisma } from "@/lib/prisma";
import HomeSectionForm from "./HomeSectionForm";
import { Box, Typography, Paper, Breadcrumbs, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditHomeSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sectionId = parseInt(id);

  if (isNaN(sectionId)) {
    notFound();
  }

  const section = await (prisma as any).homeSection.findUnique({
    where: { id: sectionId },
  });

  if (!section) {
    notFound();
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin" passHref style={{ textDecoration: 'none' }}>
            <MuiLink component="span" underline="hover" color="inherit">
              Admin
            </MuiLink>
          </Link>
          <Link href="/admin/homepage" passHref style={{ textDecoration: 'none' }}>
            <MuiLink component="span" underline="hover" color="inherit">
              Homepage Settings
            </MuiLink>
          </Link>
          <Typography color="text.primary">Edit Section</Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Edit {section.section.replace('_', ' ')} Section
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <HomeSectionForm section={section} />
      </Paper>
    </Box>
  );
}
