"use client";
import React, { useState } from "react";
import { updateProduct, deleteProductImage } from "../../actions";
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
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function ProductFormEdit({ categories, product }: { categories: any[]; product: any }) {
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState(
    product.variants.length > 0 
      ? product.variants.map((v: any) => ({ ...v })) 
      : [{ id: Date.now(), weight: "", size: "", totalWeight: "" }]
  );

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), weight: "", size: "", totalWeight: "" }]);
  };

  const removeVariant = (id: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((v: any) => v.id !== id));
    }
  };

  return (
    <Box
      component="form"
      action={async (formData) => {
        setLoading(true);
        await updateProduct(product.id, formData);
        setLoading(false);
      }}
      noValidate
    >
      <Grid container spacing={4}>
        {/* Left Column: Basic Info */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Basic Information</Typography>
              <Stack spacing={3}>
                <TextField
                  label="Product Name"
                  name="name"
                  defaultValue={product.name}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="SKU"
                      name="sku"
                      defaultValue={product.sku}
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Model No (Product)"
                      name="modelNo"
                      defaultValue={product.modelNo}
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="EAN (Barcode)"
                      name="ean"
                      defaultValue={product.ean}
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        name="categoryId"
                        label="Category"
                        defaultValue={product.categoryId}
                        sx={{ borderRadius: 2 }}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TextField
                  label="Description"
                  name="description"
                  defaultValue={product.description}
                  fullWidth
                  multiline
                  rows={6}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Stack>
            </Paper>

            {/* Specifications */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Specifications & Shipping</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Material" name="material" defaultValue={product.material} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Packaging" name="packaging" defaultValue={product.packaging} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Country of Origin" name="origin" defaultValue={product.origin} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField label="Shipping Details" name="shippingDetails" defaultValue={product.shippingDetails} fullWidth multiline rows={2} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Paper>

            {/* Variants */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Product Variants</Typography>
                <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={addVariant} sx={{ borderRadius: 2 }}>
                  Add Variant
                </Button>
              </Box>
              <Stack spacing={2}>
                {variants.map((variant: any, index: number) => (
                  <Box key={variant.id || index} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          label="Weight Range"
                          name="variantWeight[]"
                          defaultValue={variant.weight}
                          fullWidth
                          size="small"
                          sx={{ bgcolor: 'white' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          label="Size (cm)"
                          name="variantSize[]"
                          defaultValue={variant.size}
                          fullWidth
                          size="small"
                          sx={{ bgcolor: 'white' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                          label="T. Weight"
                          name="variantTotalWeight[]"
                          defaultValue={variant.totalWeight}
                          fullWidth
                          size="small"
                          sx={{ bgcolor: 'white' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 1 }}>
                        <IconButton color="error" onClick={() => removeVariant(variant.id)} disabled={variants.length === 1}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <FormControlLabel
                control={<Switch name="isActive" defaultChecked={product.isActive} color="success" />}
                label={<Typography sx={{ fontWeight: 700 }}>Published (Active)</Typography>}
              />
              <Divider sx={{ my: 2 }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Main Image</Typography>
              {product.mainImage && (
                <Avatar src={product.mainImage} variant="rounded" sx={{ width: '100%', height: 200, mb: 2, borderRadius: 2 }} />
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<UploadIcon />} sx={{ borderStyle: 'dashed', borderRadius: 2 }}>
                Update Main Photo
                <input type="file" name="mainImage" hidden accept="image/*" />
              </Button>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>Product Gallery</Typography>
              {product.gallery && product.gallery.length > 0 && (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {product.gallery.map((img: any) => (
                    <Grid size={{ xs: 4 }} key={img.id} sx={{ position: 'relative' }}>
                      <Avatar 
                        src={img.url} 
                        variant="rounded" 
                        sx={{ width: '100%', height: 80, border: '1px solid', borderColor: 'divider' }} 
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          zIndex: 2,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={async () => {
                            if (confirm("Delete this image?")) {
                              await deleteProductImage(img.id, product.id);
                            }
                          }}
                          sx={{
                            bgcolor: 'error.main',
                            color: 'white',
                            width: 20,
                            height: 20,
                            '&:hover': { bgcolor: 'error.dark' },
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        >
                          <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<AddIcon />} sx={{ borderStyle: 'dashed', borderRadius: 2 }}>
                Upload More Photos
                <input type="file" name="gallery" multiple hidden accept="image/*" />
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
