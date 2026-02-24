"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { createVariantGroupItem, deleteVariantGroupItem, updateVariantGroupItem } from "../../actions";

export default function ManageItemsClient({ group }: { group: any }) {
  const fields = group.fields as string[];
  const [items, setItems] = useState(group.items || []);
  const [newItem, setNewItem] = useState<{ [key: string]: string }>(
    fields.reduce((acc, f) => ({ ...acc, [f]: "" }), {})
  );

  const handleAddItem = async () => {
    try {
      const created = await createVariantGroupItem(group.id, newItem);
      setItems([...items, created]);
      setNewItem(fields.reduce((acc, f) => ({ ...acc, [f]: "" }), {}));
    } catch (err) {
      alert("Error adding item");
    }
  };

  const handleUpdateItem = async (itemId: number, data: any) => {
    try {
      await updateVariantGroupItem(itemId, data);
    } catch (err) {
      alert("Error updating item");
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (confirm("Delete this variant item?")) {
      try {
        await deleteVariantGroupItem(itemId);
        setItems(items.filter((i: any) => i.id !== itemId));
      } catch (err) {
        alert("Error deleting item");
      }
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={field} sx={{ fontWeight: 700 }}>{field}</TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Existing Items */}
            {items.map((item: any) => (
              <TableRow key={item.id}>
                {fields.map((field) => (
                  <TableCell key={field}>
                    <TextField
                      size="small"
                      defaultValue={item.data[field] || ""}
                      onBlur={(e) => {
                        const val = e.target.value;
                        if (val !== item.data[field]) {
                          handleUpdateItem(item.id, { ...item.data, [field]: val });
                        }
                      }}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                    />
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* New Item Row */}
            <TableRow sx={{ bgcolor: "primary.50" }}>
              {fields.map((field) => (
                <TableCell key={field}>
                  <TextField
                    size="small"
                    placeholder={`New ${field}`}
                    value={newItem[field]}
                    onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
                    sx={{ bgcolor: "white", "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                  />
                </TableCell>
              ))}
              <TableCell align="right">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddItem}
                  sx={{ borderRadius: 1.5 }}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
