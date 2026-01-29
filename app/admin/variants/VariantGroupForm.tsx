"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  NavigateBefore as BackIcon,
} from "@mui/icons-material";
import { createVariantGroup, updateVariantGroup } from "./actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VariantGroupForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [fields, setFields] = useState<string[]>(initialData?.fields || ["Weight (gm)", "Size (cm)"]);
  const [loading, setLoading] = useState(false);

  const addField = () => setFields([...fields, ""]);
  
  const updateField = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fieldData = fields.filter(f => f.trim() !== "");
      if (initialData) {
        await updateVariantGroup(initialData.id, { name, fields: fieldData });
      } else {
        await createVariantGroup({ name, fields: fieldData });
      }
      router.push("/admin/variants");
    } catch (error) {
      console.error(error);
      alert("Error saving variant group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link href="/admin/variants" passHref style={{ textDecoration: 'none' }}>
            <MuiLink underline="hover" color="primary" sx={{ display: 'flex', alignItems: 'center' }} component="span">
              <BackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Variant Groups
            </MuiLink>
          </Link>
          <Typography color="text.secondary">{initialData ? "Edit" : "New"} Group</Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {initialData ? "Edit Variant Group" : "Create Variant Group"}
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Group Name</Typography>
              <TextField
                fullWidth
                placeholder="e.g. Bowls Variants, Size Group"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Variant Fields</Typography>
                <Button size="small" startIcon={<AddIcon />} onClick={addField}>Add Field</Button>
              </Box>
              <Stack spacing={2}>
                {fields.map((field, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Field Name (e.g. Length, Color, Weight)"
                      value={field}
                      onChange={(e) => updateField(index, e.target.value)}
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                    <IconButton color="error" onClick={() => removeField(index)} disabled={fields.length === 1}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={<SaveIcon />}
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
            >
              {loading ? "Saving..." : initialData ? "Update Group" : "Create Group"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
