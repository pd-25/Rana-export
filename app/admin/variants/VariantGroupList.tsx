"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Grid,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { deleteVariantGroup } from "./actions";
import Link from "next/link";

export default function VariantGroupList({ groups }: { groups: any[] }) {
  return (
    <Grid container spacing={3}>
      {groups.length === 0 ? (
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4, border: '2px dashed', borderColor: 'divider', bgcolor: 'transparent' }}>
            <Typography variant="h6" color="text.secondary">No variant groups found</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Create a group to define customized variant fields for your products.</Typography>
          </Paper>
        </Grid>
      ) : (
        groups.map((group) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={group.id}>
            <Card sx={{ borderRadius: 3, transition: '0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{group.name}</Typography>
                  <Box>
                    <Link href={`/admin/variants/edit/${group.id}`} passHref>
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                    <IconButton size="small" color="error" onClick={async () => {
                      if (confirm(`Delete group "${group.name}"?`)) {
                        await deleteVariantGroup(group.id);
                      }
                    }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(group.fields as string[]).map((field, idx) => (
                    <Chip key={idx} label={field} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                  ))}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {group.items.length} Pre-defined Items
                  </Typography>
                  <Link href={`/admin/variants/manage/${group.id}`} passHref style={{ textDecoration: 'none' }}>
                    <Button size="small" startIcon={<SettingsIcon />} sx={{ fontWeight: 600 }}>
                      Manage Items
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}
