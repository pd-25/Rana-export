"use client";

import React, { useState } from "react";
import { createProduct } from "../actions";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
  Stack,
  Divider,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Straighten as SizeIcon,
  Scale as WeightIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
  SubdirectoryArrowRight as SubcategoryIcon,
} from "@mui/icons-material";

export default function ProductForm({
  categories,
  variantGroups,
}: {
  categories: any[];
  variantGroups: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Dynamic Variants state
  const [variantFields, setVariantFields] = useState<string[]>([
    "Weight (gm)",
    "Size (cm)",
    "Total Weight",
  ]);
  const [variantRows, setVariantRows] = useState<any[]>([
    {
      id: Date.now(),
      data: { SKU: "", "Model No": "", EAN: "" },
      imagePreview: null,
      imageFile: null,
    },
  ]);

  // Previews
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  const [selectedGroup, setSelectedGroup] = useState("");

  const handleVariantGroupChange = (groupId: any) => {
    if (!groupId) return;

    const group = variantGroups.find((g) => String(g.id) === String(groupId));
    if (!group) {
      console.warn("Group not found for ID:", groupId);
      return;
    }

    // ONLY UPDATE FIELDS (The Template)
    const fields = Array.isArray(group.fields) ? group.fields : [];
    setVariantFields(fields);

    // Important: We do NOT create new rows/tabs here anymore.
    // The user will use the separate "Add Variation" button to create items.
  };

  const addVariantRow = () => {
    const newId = Date.now();
    setVariantRows([
      ...variantRows,
      {
        id: newId,
        data: { SKU: "", "Model No": "", EAN: "" },
        imagePreview: null,
        imageFile: null,
      },
    ]);
    setActiveTab(variantRows.length);
  };

  const removeVariantRow = (id: number) => {
    if (variantRows.length > 1) {
      setVariantRows(variantRows.filter((v) => v.id !== id));
      if (activeTab >= variantRows.length - 1) {
        setActiveTab(Math.max(0, variantRows.length - 2));
      }
    }
  };

  const updateVariantValue = (rowId: number, field: string, value: string) => {
    setVariantRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? { ...row, data: { ...row.data, [field]: value } }
          : row,
      ),
    );
  };

  const handleVariantImageChange = (rowId: number, file: File | null) => {
    setVariantRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              imageFile: file,
              imagePreview: file ? URL.createObjectURL(file) : null,
            }
          : row,
      ),
    );
  };

  const addCustomField = () => {
    const newField = prompt(
      "Enter new variant field name (e.g. Color, Material, Liter):",
    );
    if (newField && !variantFields.includes(newField)) {
      setVariantFields([...variantFields, newField]);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prev) => [...prev, ...files]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocumentFiles((prev) => [...prev, ...files]);
  };

  const formatCategories = (allCats: any[]) => {
    const flattened: any[] = [];
    const map: Record<number, any> = {};
    allCats.forEach((cat) => (map[cat.id] = { ...cat, children: [] }));
    const roots: any[] = [];
    allCats.forEach((cat) => {
      if (cat.parentId && map[cat.parentId]) {
        map[cat.parentId].children.push(map[cat.id]);
      } else {
        roots.push(map[cat.id]);
      }
    });
    const traverse = (nodes: any[], depth = 0) => {
      nodes.forEach((node) => {
        flattened.push({ ...node, depth });
        if (node.children) traverse(node.children, depth + 1);
      });
    };
    traverse(roots);
    return flattened;
  };

  const formattedCategories = formatCategories(categories);

  return (
    <Box
      component="form"
      action={async (formData) => {
        setLoading(true);

        // Handle Gallery
        formData.delete("gallery");
        galleryFiles.forEach((file) => formData.append("gallery", file));

        // Handle Documents
        formData.delete("documents");
        documentFiles.forEach((file) => formData.append("documents", file));

        // Handle Dynamic Variants
        formData.delete("variantData[]");
        variantRows.forEach((row, index) => {
          formData.append("variantData[]", JSON.stringify(row.data));
          if (row.imageFile) {
            formData.append(`variantImage_${index}`, row.imageFile);
          }
        });

        await createProduct(formData);
      }}
      noValidate
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "primary.main" }}
          >
            Product Registration
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Register your product and its multiple variations
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{ borderRadius: 2, px: 4, fontWeight: 700 }}
          >
            {loading ? "Registering..." : "Publish Product"}
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Basic Info */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Basic Information
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label="Product Name"
                  name="name"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    name="categoryId"
                    label="Category"
                    defaultValue=""
                    sx={{ borderRadius: 2 }}
                    renderValue={(selected) => {
                      const cat = formattedCategories.find(
                        (c) => c.id === selected,
                      );
                      return cat ? cat.name : "";
                    }}
                  >
                    {formattedCategories.map((cat) => (
                      <MenuItem
                        key={cat.id}
                        value={cat.id}
                        sx={{
                          pl: cat.depth * 3 + 2,
                          py: 1.5,
                          borderBottom: "1px solid",
                          borderColor: "grey.100",
                          "&:last-child": { borderBottom: 0 },
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {cat.depth > 0 && (
                            <SubcategoryIcon
                              sx={{
                                fontSize: "1rem",
                                color: "text.secondary",
                                opacity: 0.6,
                              }}
                            />
                          )}
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: cat.depth === 0 ? 700 : 400 }}
                          >
                            {cat.name}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <FormControl fullWidth>
                  <InputLabel id="related-category-label">
                    See Related Items — Category
                  </InputLabel>
                  <Select
                    labelId="related-category-label"
                    name="relatedCategoryId"
                    label="See Related Items — Category"
                    defaultValue=""
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="">
                      <em>Same as product category (default)</em>
                    </MenuItem>
                    {formattedCategories.map((cat) => (
                      <MenuItem
                        key={cat.id}
                        value={cat.id}
                        sx={{ pl: cat.depth * 3 + 2, py: 1.5 }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {cat.depth > 0 && (
                            <SubcategoryIcon
                              sx={{
                                fontSize: "1rem",
                                color: "text.secondary",
                                opacity: 0.6,
                              }}
                            />
                          )}
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: cat.depth === 0 ? 700 : 400 }}
                          >
                            {cat.name}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="you-might-also-label">
                    You Might Also Like — Category
                  </InputLabel>
                  <Select
                    labelId="you-might-also-label"
                    name="youMightAlsoCategoryId"
                    label="You Might Also Like — Category"
                    defaultValue=""
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="">
                      <em>Same as product category (default)</em>
                    </MenuItem>
                    {formattedCategories.map((cat) => (
                      <MenuItem
                        key={cat.id}
                        value={cat.id}
                        sx={{ pl: cat.depth * 3 + 2, py: 1.5 }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {cat.depth > 0 && (
                            <SubcategoryIcon
                              sx={{
                                fontSize: "1rem",
                                color: "text.secondary",
                                opacity: 0.6,
                              }}
                            />
                          )}
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: cat.depth === 0 ? 700 : 400 }}
                          >
                            {cat.name}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Paper>

            {/* Variations Section - FULL WIDTH */}
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 4,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    1. Variation Template
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Select a group or create custom fields to define "Dynamic
                    Fields"
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                      <InputLabel id="variant-group-label">
                        Load Template Group
                      </InputLabel>
                      <Select
                        labelId="variant-group-label"
                        label="Load Template Group"
                        value={selectedGroup}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedGroup(val);
                          handleVariantGroupChange(val);
                        }}
                        sx={{ borderRadius: 2 }}
                      >
                        {variantGroups.map((g) => (
                          <MenuItem key={g.id} value={g.id}>
                            {g.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      size="small"
                      onClick={addCustomField}
                      sx={{ borderRadius: 2 }}
                    >
                      New Field
                    </Button>
                  </Stack>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    2. Add Variation
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Create multiple items for this product
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="small"
                    onClick={addVariantRow}
                    sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
                  >
                    Add New Varient
                  </Button>
                </Box>
              </Box>

              <Tabs
                value={activeTab}
                onChange={(e, v) => setActiveTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
              >
                {variantRows.map((row, index) => (
                  <Tab
                    key={row.id}
                    label={`Varient ${index + 1}`}
                    sx={{ fontWeight: 700 }}
                  />
                ))}
              </Tabs>

              {variantRows[activeTab] && (
                <Box>
                  <Grid container spacing={4}>
                    {/* Left: Fields */}
                    <Grid size={{ xs: 12, md: 8 }}>
                      <Grid container spacing={2}>
                        {/* Common Variation Fields */}
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            label="SKU"
                            fullWidth
                            value={variantRows[activeTab].data["SKU"] || ""}
                            onChange={(e) =>
                              updateVariantValue(
                                variantRows[activeTab].id,
                                "SKU",
                                e.target.value,
                              )
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <TextField
                            label="Model No (Product)"
                            fullWidth
                            value={
                              variantRows[activeTab].data["Model No"] || ""
                            }
                            onChange={(e) =>
                              updateVariantValue(
                                variantRows[activeTab].id,
                                "Model No",
                                e.target.value,
                              )
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            label="EAN (Barcode)"
                            fullWidth
                            value={variantRows[activeTab].data["EAN"] || ""}
                            onChange={(e) =>
                              updateVariantValue(
                                variantRows[activeTab].id,
                                "EAN",
                                e.target.value,
                              )
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": { borderRadius: 2 },
                            }}
                          />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                          <Divider sx={{ my: 1 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Dynamic Fields
                            </Typography>
                          </Divider>
                        </Grid>

                        {variantFields.map((field) => (
                          <Grid size={{ xs: 12, md: 6 }} key={field}>
                            <TextField
                              label={field}
                              fullWidth
                              value={variantRows[activeTab].data[field] || ""}
                              onChange={(e) =>
                                updateVariantValue(
                                  variantRows[activeTab].id,
                                  field,
                                  e.target.value,
                                )
                              }
                              sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    {/* Right: Variant Image */}
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, mb: 1 }}
                      >
                        Variant Photo
                      </Typography>
                      {variantRows[activeTab].imagePreview ? (
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            src={variantRows[activeTab].imagePreview}
                            variant="rounded"
                            sx={{
                              width: "100%",
                              height: 180,
                              borderRadius: 2,
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleVariantImageChange(
                                variantRows[activeTab].id,
                                null,
                              )
                            }
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "rgba(255,255,255,0.8)",
                            }}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button
                          component="label"
                          variant="outlined"
                          fullWidth
                          startIcon={<UploadIcon />}
                          sx={{
                            height: 180,
                            borderStyle: "dashed",
                            borderRadius: 2,
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          Upload Photo
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) =>
                              handleVariantImageChange(
                                variantRows[activeTab].id,
                                e.target.files?.[0] || null,
                              )
                            }
                          />
                        </Button>
                      )}

                      {variantRows.length > 1 && (
                        <Button
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() =>
                            removeVariantRow(variantRows[activeTab].id)
                          }
                          sx={{ mt: 2, fontWeight: 700 }}
                        >
                          Remove this Variation
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>

            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Specifications & Shipping
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Material"
                    name="material"
                    fullWidth
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Packaging"
                    name="packaging"
                    fullWidth
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Country of Origin"
                    name="origin"
                    fullWidth
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Shipping Details"
                    name="shippingDetails"
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Column: Media & Actions */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <FormControlLabel
                control={
                  <Switch name="isActive" defaultChecked color="success" />
                }
                label={
                  <Typography sx={{ fontWeight: 700 }}>
                    Active (In Stock)
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Switch name="showOnHome" color="primary" />}
                label={
                  <Typography sx={{ fontWeight: 700 }}>
                    Show in Home Page
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Switch name="isOurCollection" color="secondary" />}
                label={
                  <Typography sx={{ fontWeight: 700 }}>
                    Our Collection
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Switch name="isCraftedSelection" color="warning" />}
                label={
                  <Typography sx={{ fontWeight: 700 }}>
                    Crafted Selection
                  </Typography>
                }
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Main Display Image
              </Typography>
              {mainImagePreview && (
                <Box sx={{ mb: 2, position: "relative" }}>
                  <Avatar
                    src={mainImagePreview}
                    variant="rounded"
                    sx={{
                      width: "100%",
                      height: 200,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => setMainImagePreview(null)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              )}
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{
                  height: mainImagePreview ? 50 : 100,
                  borderStyle: "dashed",
                  borderRadius: 2,
                }}
              >
                {mainImagePreview ? "Change Photo" : "Upload Photo"}
                <input
                  type="file"
                  name="mainImage"
                  hidden
                  accept="image/*"
                  onChange={handleMainImageChange}
                />
              </Button>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mt: 4, mb: 2 }}
              >
                Product Gallery
              </Typography>
              {galleryFiles.length > 0 && (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {galleryFiles.map((file, i) => (
                    <Grid
                      size={{ xs: 4 }}
                      key={i}
                      sx={{ position: "relative" }}
                    >
                      <Avatar
                        src={URL.createObjectURL(file)}
                        variant="rounded"
                        sx={{
                          width: "100%",
                          height: 80,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeGalleryFile(i)}
                        sx={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          bgcolor: "error.main",
                          color: "white",
                          width: 20,
                          height: 20,
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                sx={{ height: 60, borderStyle: "dashed", borderRadius: 2 }}
              >
                Add Multiple Photos
                <input
                  type="file"
                  name="gallery"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={handleGalleryChange}
                />
              </Button>
            </Paper>

            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Important Documents (PDF)
              </Typography>
              {documentFiles.length > 0 && (
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {documentFiles.map((file, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 1,
                        bgcolor: "grey.100",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="caption"
                        noWrap
                        sx={{ maxWidth: "80%" }}
                      >
                        {file.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          setDocumentFiles((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              )}
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{ borderRadius: 2 }}
              >
                Attach PDF Files
                <input
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  accept="application/pdf"
                  onChange={handleDocumentChange}
                />
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
