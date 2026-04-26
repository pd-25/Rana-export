"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
  Stack,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { updateHomeSection, uploadImageAction } from "../../actions";

interface HomeSectionFormProps {
  section: any;
}

// ─── Image Upload Component ──────────────────────────────────────
function ImageUploadField({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (url: string) => void 
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImageAction(formData);
      if (result.url) {
        onChange(result.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>{label}</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        {value && (
          <Box 
            component="img" 
            src={value} 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: 1, 
              objectFit: "cover", 
              border: "1px solid",
              borderColor: "divider"
            }} 
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or upload a file"
            sx={{ mb: 1 }}
          />
          <Button
            component="label"
            variant="outlined"
            size="small"
            startIcon={uploading ? <CircularProgress size={16} /> : <UploadIcon />}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Local Image"}
            <input type="file" hidden accept="image/*" onChange={handleUpload} />
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

// ─── Hero Section Editor ───────────────────────────────────────────
function HeroEditor({ content, onChange }: { content: any; onChange: (c: any) => void }) {
  const c = content || {};
  const sliderImages: any[] = c.sliderImages || [];
  const bottomInfo: any[] = c.bottomInfo || [];
  const features: any[] = c.features || [];

  const set = (key: string, value: any) => onChange({ ...c, [key]: value });
  const updateSliderImage = (i: number, field: string, val: string) => {
    const arr = [...sliderImages];
    const item = typeof arr[i] === 'object' ? { ...arr[i] } : { image: arr[i], link: "" };
    item[field] = val;
    arr[i] = item;
    set("sliderImages", arr);
  };
  const removeSliderImage = (i: number) => set("sliderImages", sliderImages.filter((_, idx) => idx !== i));
  const addSliderImage = () => set("sliderImages", [...sliderImages, { image: "", link: "" }]);

  const updateBottomInfo = (i: number, field: string, val: string) => {
    const arr = [...bottomInfo];
    arr[i] = { ...arr[i], [field]: val };
    set("bottomInfo", arr);
  };
  const removeBottomInfo = (i: number) => set("bottomInfo", bottomInfo.filter((_, idx) => idx !== i));
  const addBottomInfo = () => set("bottomInfo", [...bottomInfo, { title: "", description: "", icon: "" }]);

  const updateFeature = (i: number, field: string, val: string) => {
    const arr = [...features];
    arr[i] = { ...arr[i], [field]: val };
    set("features", arr);
  };
  const removeFeature = (i: number) => set("features", features.filter((_, idx) => idx !== i));
  const addFeature = () => set("features", [...features, { title: "", subtitle: "", icon: "" }]);

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>Button</Typography>
        <Stack direction="row" spacing={2}>
          <TextField label="Button Text" value={c.buttonText || ""} onChange={e => set("buttonText", e.target.value)} fullWidth />
          <TextField label="Button Link" value={c.buttonLink || ""} onChange={e => set("buttonLink", e.target.value)} fullWidth />
        </Stack>
      </Box>

      <Box>
        <ImageUploadField 
          label="Background Image" 
          value={c.backgroundImage || ""} 
          onChange={val => set("backgroundImage", val)} 
        />
      </Box>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>Slider Images</Typography>
          <Button startIcon={<AddIcon />} onClick={addSliderImage} size="small">Add Image</Button>
        </Box>
        <Stack spacing={2}>
          {sliderImages.map((slide: any, i: number) => {
            const imgValue = typeof slide === 'string' ? slide : slide?.image || "";
            const linkValue = typeof slide === 'object' ? slide?.link || "" : "";
            return (
              <Card key={i} variant="outlined">
                <CardContent sx={{ position: 'relative' }}>
                  <IconButton 
                    onClick={() => removeSliderImage(i)} 
                    color="error" 
                    size="small" 
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Stack spacing={2}>
                    <ImageUploadField 
                      label={`Slide ${i + 1} Image`} 
                      value={imgValue} 
                      onChange={val => updateSliderImage(i, "image", val)} 
                    />
                    <TextField 
                      label="Redirect Link" 
                      value={linkValue} 
                      onChange={e => updateSliderImage(i, "link", e.target.value)} 
                      fullWidth 
                      size="small" 
                      placeholder="e.g. /category/singing-bowls"
                    />
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>Bottom Info Boxes</Typography>
          <Button startIcon={<AddIcon />} onClick={addBottomInfo} size="small">Add Box</Button>
        </Box>
        <Stack spacing={3}>
          {bottomInfo.map((info: any, i: number) => (
            <Card key={i} variant="outlined">
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Chip label={`Box ${i + 1}`} size="small" />
                  <IconButton onClick={() => removeBottomInfo(i)} color="error" size="small"><DeleteIcon /></IconButton>
                </Box>
                <Stack spacing={2}>
                  <TextField label="Title" value={info.title || ""} onChange={e => updateBottomInfo(i, "title", e.target.value)} fullWidth size="small" />
                  <TextField label="Description" value={info.description || ""} onChange={e => updateBottomInfo(i, "description", e.target.value)} fullWidth multiline rows={3} size="small" />
                  <ImageUploadField label="Icon" value={info.icon || ""} onChange={val => updateBottomInfo(i, "icon", val)} />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>Feature Tags</Typography>
          <Button startIcon={<AddIcon />} onClick={addFeature} size="small">Add Feature</Button>
        </Box>
        <Stack spacing={2}>
          {features.map((f: any, i: number) => (
            <Card key={i} variant="outlined">
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Chip label={`Feature ${i + 1}`} size="small" />
                  <IconButton onClick={() => removeFeature(i)} color="error" size="small"><DeleteIcon /></IconButton>
                </Box>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <TextField label="Title" value={f.title || ""} onChange={e => updateFeature(i, "title", e.target.value)} fullWidth size="small" />
                    <TextField label="Subtitle" value={f.subtitle || ""} onChange={e => updateFeature(i, "subtitle", e.target.value)} fullWidth size="small" />
                  </Stack>
                  <ImageUploadField label="Icon" value={f.icon || ""} onChange={val => updateFeature(i, "icon", val)} />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

// ─── Product Video Editor ──────────────────────────────────────────
function VideoEditor({ content, onChange }: { content: any; onChange: (c: any) => void }) {
  const c = content || {};
  const videos: string[] = c.videos || [];

  const updateVideo = (i: number, val: string) => {
    const arr = [...videos];
    arr[i] = val;
    onChange({ ...c, videos: arr });
  };
  const removeVideo = (i: number) => onChange({ ...c, videos: videos.filter((_, idx) => idx !== i) });
  const addVideo = () => onChange({ ...c, videos: [...videos, ""] });

  return (
    <Stack spacing={3}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>YouTube Embed URLs</Typography>
          <Button startIcon={<AddIcon />} onClick={addVideo} size="small">Add Video</Button>
        </Box>
        <Stack spacing={2}>
          {videos.map((video: string, i: number) => (
            <Stack key={i} direction="row" spacing={1} alignItems="center">
              <TextField
                label={`Video ${i + 1} Embed URL`}
                value={video}
                onChange={e => updateVideo(i, e.target.value)}
                fullWidth
                size="small"
                placeholder="https://www.youtube.com/embed/..."
              />
              <IconButton onClick={() => removeVideo(i)} color="error" size="small"><DeleteIcon /></IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

// ─── Testimonial Editor ────────────────────────────────────────────
function TestimonialEditor({ content, onChange }: { content: any; onChange: (c: any) => void }) {
  const c = content || {};
  const testimonials: any[] = c.testimonials || [];

  const update = (i: number, field: string, val: string) => {
    const arr = [...testimonials];
    arr[i] = { ...arr[i], [field]: val };
    onChange({ ...c, testimonials: arr });
  };
  const remove = (i: number) => onChange({ ...c, testimonials: testimonials.filter((_, idx) => idx !== i) });
  const add = () => onChange({ ...c, testimonials: [...testimonials, { name: "", role: "", text: "", avatar: "" }] });

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button startIcon={<AddIcon />} onClick={add} size="small">Add Testimonial</Button>
      </Box>
      {testimonials.map((t: any, i: number) => (
        <Card key={i} variant="outlined">
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Chip label={`Testimonial ${i + 1}`} size="small" />
              <IconButton onClick={() => remove(i)} color="error" size="small"><DeleteIcon /></IconButton>
            </Box>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField label="Name" value={t.name || ""} onChange={e => update(i, "name", e.target.value)} fullWidth size="small" />
                <TextField label="Role / Company" value={t.role || ""} onChange={e => update(i, "role", e.target.value)} fullWidth size="small" />
              </Stack>
              <TextField label="Review Text" value={t.text || ""} onChange={e => update(i, "text", e.target.value)} fullWidth multiline rows={4} size="small" />
              <ImageUploadField label="Avatar Image" value={t.avatar || ""} onChange={val => update(i, "avatar", val)} />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

// ─── CSR & Awards Editor ───────────────────────────────────────────
function CsrAwardsEditor({ content, onChange }: { content: any; onChange: (c: any) => void }) {
  const c = content || {};
  const csr = c.csr || {};
  const awards = c.awards || {};

  const setCsr = (field: string, val: string) => onChange({ ...c, csr: { ...csr, [field]: val } });
  const setAwards = (field: string, val: string) => onChange({ ...c, awards: { ...awards, [field]: val } });

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>CSR Card</Typography>
        <Stack spacing={2}>
          <TextField label="Title" value={csr.title || ""} onChange={e => setCsr("title", e.target.value)} fullWidth />
          <TextField label="Description" value={csr.description || ""} onChange={e => setCsr("description", e.target.value)} fullWidth multiline rows={3} />
          <ImageUploadField label="Feature Image" value={csr.image || ""} onChange={val => setCsr("image", val)} />
          <TextField label="Note / Caption" value={csr.note || ""} onChange={e => setCsr("note", e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Button Text" value={csr.buttonText || ""} onChange={e => setCsr("buttonText", e.target.value)} fullWidth />
        </Stack>
      </Box>
      <Divider />
      <Box>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>Awards Card</Typography>
        <Stack spacing={2}>
          <TextField label="Title" value={awards.title || ""} onChange={e => setAwards("title", e.target.value)} fullWidth />
          <TextField label="Description" value={awards.description || ""} onChange={e => setAwards("description", e.target.value)} fullWidth multiline rows={3} />
          <ImageUploadField label="Award Image" value={awards.image || ""} onChange={val => setAwards("image", val)} />
          <ImageUploadField label="Trophy Icon" value={awards.trophyImage || ""} onChange={val => setAwards("trophyImage", val)} />
          <TextField label="Note / Caption" value={awards.note || ""} onChange={e => setAwards("note", e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Button Text" value={awards.buttonText || ""} onChange={e => setAwards("buttonText", e.target.value)} fullWidth />
        </Stack>
      </Box>
    </Stack>
  );
}

// ─── Trusted Service Editor ────────────────────────────────────────
function TrustedServiceEditor({ content, onChange }: { content: any; onChange: (c: any) => void }) {
  const c = content || {};
  const items: any[] = c.items || [];

  const update = (i: number, field: string, val: string) => {
    const arr = [...items];
    arr[i] = { ...arr[i], [field]: val };
    onChange({ ...c, items: arr });
  };
  const remove = (i: number) => onChange({ ...c, items: items.filter((_, idx) => idx !== i) });
  const add = () => onChange({ ...c, items: [...items, { text: "", image: "" }] });

  return (
    <Stack spacing={3}>
      <Box>
        <ImageUploadField label="Background Image" value={c.backgroundImage || ""} onChange={val => onChange({ ...c, backgroundImage: val })} />
      </Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>Trusted By Items</Typography>
          <Button startIcon={<AddIcon />} onClick={add} size="small">Add Item</Button>
        </Box>
        <Stack spacing={2}>
          {items.map((item: any, i: number) => (
            <Card key={i} variant="outlined">
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Chip label={`Item ${i + 1}`} size="small" />
                  <IconButton onClick={() => remove(i)} color="error" size="small"><DeleteIcon /></IconButton>
                </Box>
                <Stack spacing={2}>
                  <TextField label="Label Text" value={item.text || ""} onChange={e => update(i, "text", e.target.value)} fullWidth size="small" />
                  <ImageUploadField label="Logo Image" value={item.image || ""} onChange={val => update(i, "image", val)} />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

// ─── Discover Section Editor ───────────────────────────────────────
function DiscoverEditor() {
  return (
    <Alert severity="info">
      The Discover section automatically shows categories from the database that are marked as <strong>&quot;Show on Home&quot;</strong>.
      To control which categories appear here, go to <strong>Admin → Categories</strong> and toggle the &quot;Show on Home&quot; setting.
    </Alert>
  );
}

// ─── Generic JSON fallback ─────────────────────────────────────────
function GenericEditor({ content, onChange }: { content: any; onChange: (c: any) => void }) {
  const [json, setJson] = useState(JSON.stringify(content, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleChange = (val: string) => {
    setJson(val);
    try {
      onChange(JSON.parse(val));
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  return (
    <Stack spacing={2}>
      {jsonError && <Alert severity="error">Invalid JSON: {jsonError}</Alert>}
      <TextField
        fullWidth
        multiline
        rows={20}
        value={json}
        onChange={e => handleChange(e.target.value)}
        InputProps={{ style: { fontFamily: "monospace", fontSize: 13 } }}
      />
    </Stack>
  );
}

// ─── Main Form Component ───────────────────────────────────────────
export default function HomeSectionForm({ section }: HomeSectionFormProps) {
  const [title, setTitle] = useState(section.title || "");
  const [subtitle, setSubtitle] = useState(section.subtitle || "");
  const [isActive, setIsActive] = useState(section.isActive);
  const [order, setOrder] = useState(section.order);
  const [content, setContent] = useState<any>(section.content || {});
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateHomeSection(section.id, { title, subtitle, isActive, order, content });
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const renderContentEditor = () => {
    switch (section.section) {
      case "hero": return <HeroEditor content={content} onChange={setContent} />;
      case "product_video": return <VideoEditor content={content} onChange={setContent} />;
      case "testimonial": return <TestimonialEditor content={content} onChange={setContent} />;
      case "csr_awards": return <CsrAwardsEditor content={content} onChange={setContent} />;
      case "trusted_service": return <TrustedServiceEditor content={content} onChange={setContent} />;
      case "discover": return <DiscoverEditor />;
      default: return <GenericEditor content={content} onChange={setContent} />;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tab label="Basic Info" />
        <Tab label="Content Editor" />
      </Tabs>

      {tab === 0 && (
        <Stack spacing={3}>
          <TextField label="Section Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
          <TextField label="Section Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} fullWidth multiline rows={2} />
          <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
            <TextField label="Display Order" type="number" value={order} onChange={e => setOrder(parseInt(e.target.value))} sx={{ width: 150 }} />
            <FormControlLabel
              control={<Switch checked={isActive} onChange={e => setIsActive(e.target.checked)} />}
              label="Visible / Published"
            />
          </Box>
        </Stack>
      )}

      {tab === 1 && (
        <Box>
          <Alert severity="info" sx={{ mb: 3 }}>
            Changes here update the live homepage immediately after saving.
          </Alert>
          {renderContentEditor()}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" href="/admin/homepage" disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
}
