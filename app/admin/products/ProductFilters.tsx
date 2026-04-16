"use client";

import React from "react";
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  InputAdornment,
  Stack,
  Typography
} from "@mui/material";
import { Search as SearchIcon, FilterList as FilterIcon, SubdirectoryArrowRight as SubcategoryIcon } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentType = searchParams.get("type") || "all";

  const updateFilters = (search: string, category: string, type: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (type !== "all") params.set("type", type);
    router.push(`/admin/products?${params.toString()}`);
  };

  const formatCategories = (allCats: any[]) => {
    const flattened: any[] = [];
    const map: Record<number, any> = {};
    allCats.forEach(cat => map[cat.id] = { ...cat, children: [] });
    const roots: any[] = [];
    allCats.forEach(cat => {
      if (cat.parentId && map[cat.parentId]) {
        map[cat.parentId].children.push(map[cat.id]);
      } else {
        roots.push(map[cat.id]);
      }
    });
    const traverse = (nodes: any[], depth = 0) => {
      nodes.forEach(node => {
        flattened.push({ ...node, depth });
        if (node.children) traverse(node.children, depth + 1);
      });
    };
    traverse(roots);
    return flattened;
  };

  const formattedCategories = formatCategories(categories);

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
      <TextField
        placeholder="Search product name..."
        size="small"
        value={currentSearch}
        onChange={(e) => updateFilters(e.target.value, currentCategory, currentType)}
        sx={{ flexGrow: 1, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "background.paper" } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }
        }}
      />
      
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="category-filter-label" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon fontSize="inherit" /> Category
        </InputLabel>
        <Select
          labelId="category-filter-label"
          label="Category"
          value={currentCategory}
          onChange={(e) => updateFilters(currentSearch, e.target.value as string, currentType)}
          sx={{ borderRadius: 2, bgcolor: "background.paper" }}
          renderValue={(selected) => {
            if (selected === "all") return "All Categories";
            const cat = formattedCategories.find(c => c.id.toString() === selected);
            return cat ? cat.name : "All Categories";
          }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {formattedCategories.map((cat) => (
            <MenuItem 
              key={cat.id} 
              value={cat.id.toString()}
              sx={{ 
                pl: cat.depth * 3 + 2,
                py: 1,
                borderBottom: '1px solid',
                borderColor: 'grey.100',
                '&:last-child': { borderBottom: 0 }
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                {cat.depth > 0 && <SubcategoryIcon sx={{ fontSize: '1rem', color: 'text.secondary', opacity: 0.6 }} />}
                <Typography variant="body2" sx={{ fontWeight: cat.depth === 0 ? 700 : 400 }}>
                  {cat.name}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="type-filter-label">Special Group</InputLabel>
        <Select
          labelId="type-filter-label"
          label="Special Group"
          value={currentType}
          onChange={(e) => updateFilters(currentSearch, currentCategory, e.target.value as string)}
          sx={{ borderRadius: 2, bgcolor: "background.paper" }}
        >
          <MenuItem value="all">All Products</MenuItem>
          <MenuItem value="our-collection">Our Collection</MenuItem>
          <MenuItem value="crafted-selection">Crafted Selection</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
