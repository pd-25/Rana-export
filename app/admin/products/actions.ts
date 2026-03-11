"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";

const productModel = (prisma as any).product;

async function generateProductSlug(name: string, excludeId?: number) {
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let originalSlug = slug;
  let count = 1;

  while (true) {
    const existing = await productModel.findFirst({ 
      where: { 
        slug,
        id: excludeId ? { not: excludeId } : undefined
      } 
    });
    if (!existing) break;
    slug = `${originalSlug}-${count}`;
    count++;
  }

  return slug;
}

async function generateUniqueProductName(originalName: string) {
  // Strip existing suffix if it matches " (Number)"
  const suffixMatch = originalName.match(/\s\((\d+)\)$/);
  let baseName = originalName;
  if (suffixMatch) {
    baseName = originalName.replace(/\s\((\d+)\)$/, "");
  }

  let count = 1;
  let finalName = `${baseName} (${count})`;

  while (true) {
    const existing = await productModel.findFirst({
      where: { name: finalName },
    });
    if (!existing) break;
    count++;
    finalName = `${baseName} (${count})`;
  }

  return finalName;
}

async function handleFileUpload(file: File | null, subfolder: string = "products") {
  if (!file || file.size === 0 || !(file instanceof File)) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const uploadDir = path.join(process.cwd(), `public/uploads/${subfolder}`);
  
  await fs.mkdir(uploadDir, { recursive: true });
  
  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);
  
  return `/uploads/${subfolder}/${filename}`;
}

export async function createProduct(formData: FormData) {
  let name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const modelNo = formData.get("modelNo") as string;
  const ean = formData.get("ean") as string;
  const description = formData.get("description") as string;
  
  const categoryIdStr = formData.get("categoryId") as string;
  let categoryId = categoryIdStr ? parseInt(categoryIdStr) : null;

  if (!name) name = `Product ${Date.now()}`;
  if (!categoryId || isNaN(categoryId)) {
    const firstCat = await (prisma as any).category.findFirst();
    categoryId = firstCat?.id || 1;
  }

  const material = formData.get("material") as string;
  const packaging = formData.get("packaging") as string;
  const origin = formData.get("origin") as string;
  const shippingDetails = formData.get("shippingDetails") as string;
  const isActive = formData.get("isActive") === "on";
  const showOnHome = formData.get("showOnHome") === "on";

  const relatedCategoryIdStr = formData.get("relatedCategoryId") as string;
  const relatedCategoryId = relatedCategoryIdStr ? parseInt(relatedCategoryIdStr) : null;

  const youMightAlsoCategoryIdStr = formData.get("youMightAlsoCategoryId") as string;
  const youMightAlsoCategoryId = youMightAlsoCategoryIdStr ? parseInt(youMightAlsoCategoryIdStr) : null;

  const mainImageFile = formData.get("mainImage") as File;
  const variantImageFile = formData.get("variantImage") as File;
  const galleryFiles = formData.getAll("gallery") as File[];
  const documentFiles = formData.getAll("documents") as File[];

  const slug = await generateProductSlug(name);
  const mainImageUrl = await handleFileUpload(mainImageFile);
  const variantImageUrl = await handleFileUpload(variantImageFile);

  // Parse variants
  const variantWeights = formData.getAll("variantWeight[]") as string[];
  const variantSizes = formData.getAll("variantSize[]") as string[];
  const variantTotalWeights = formData.getAll("variantTotalWeight[]") as string[];

  // Handle Variants
  const variantDataStrings = formData.getAll("variantData[]") as string[];
  let firstVariantData: any = null;
  if (variantDataStrings.length > 0) {
    try {
      firstVariantData = JSON.parse(variantDataStrings[0]);
    } catch {}
  }

  const product = await productModel.create({
    data: {
      name,
      slug,
      sku: sku || firstVariantData?.SKU || null,
      modelNo: modelNo || firstVariantData?.["Model No"] || null,
      ean: ean || firstVariantData?.EAN || null,
      description,
      categoryId,
      material,
      packaging,
      origin,
      shippingDetails,
      isActive,
      showOnHome,
      mainImage: mainImageUrl,
      relatedCategoryId: relatedCategoryId && !isNaN(relatedCategoryId) ? relatedCategoryId : null,
      youMightAlsoCategoryId: youMightAlsoCategoryId && !isNaN(youMightAlsoCategoryId) ? youMightAlsoCategoryId : null,
    },
  });

  // Handle Gallery
  for (const file of galleryFiles) {
    const url = await handleFileUpload(file, "products/gallery");
    if (url) {
      await (prisma as any).productImage.create({
        data: { url, productId: product.id }
      });
    }
  }

  // Handle Documents
  for (const file of documentFiles) {
    const url = await handleFileUpload(file, "products/documents");
    if (url) {
      await (prisma as any).productDocument.create({
        data: { name: file.name, url, productId: product.id }
      });
    }
  }

  // No need to redeclare here, already declared above
  for (let i = 0; i < variantDataStrings.length; i++) {
    const dataStr = variantDataStrings[i];
    try {
      const data = JSON.parse(dataStr);
      
      // Check for variant specific image
      const variantImageFile = formData.get(`variantImage_${i}`) as File;
      if (variantImageFile && variantImageFile.size > 0) {
        const url = await handleFileUpload(variantImageFile, "products/variants");
        if (url) {
          data.variantImage = url;
        }
      }

      await (prisma as any).productVariant.create({
        data: {
          data,
          productId: product.id,
        }
      });
    } catch (e) {
      console.error("Error saving variant:", e);
    }
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const modelNo = formData.get("modelNo") as string;
  const ean = formData.get("ean") as string;
  const description = formData.get("description") as string;
  
  const categoryIdStr = formData.get("categoryId") as string;
  const categoryId = categoryIdStr ? parseInt(categoryIdStr) : null;

  if (!categoryId || isNaN(categoryId)) {
    throw new Error("Category is required");
  }

  const material = formData.get("material") as string;
  const packaging = formData.get("packaging") as string;
  const origin = formData.get("origin") as string;
  const shippingDetails = formData.get("shippingDetails") as string;
  const isActive = formData.get("isActive") === "on";

  const relatedCategoryIdStr = formData.get("relatedCategoryId") as string;
  const relatedCategoryId = relatedCategoryIdStr ? parseInt(relatedCategoryIdStr) : null;

  const youMightAlsoCategoryIdStr = formData.get("youMightAlsoCategoryId") as string;
  const youMightAlsoCategoryId = youMightAlsoCategoryIdStr ? parseInt(youMightAlsoCategoryIdStr) : null;

  const mainImageFile = formData.get("mainImage") as File;
  const variantImageFile = formData.get("variantImage") as File;
  const galleryFiles = formData.getAll("gallery") as File[];
  const documentFiles = formData.getAll("documents") as File[];

  const slug = await generateProductSlug(name, id);
  const mainImageUrl = await handleFileUpload(mainImageFile);
  const variantImageUrl = await handleFileUpload(variantImageFile);

  const updateData: any = {
    name,
    slug,
    sku,
    modelNo,
    ean,
    description,
    categoryId,
    material,
    packaging,
    origin,
    shippingDetails,
    isActive,
    showOnHome: formData.get("showOnHome") === "on",
    relatedCategoryId: relatedCategoryId && !isNaN(relatedCategoryId) ? relatedCategoryId : null,
    youMightAlsoCategoryId: youMightAlsoCategoryId && !isNaN(youMightAlsoCategoryId) ? youMightAlsoCategoryId : null,
  };

  if (mainImageUrl) {
    updateData.mainImage = mainImageUrl;
  }
  if (variantImageUrl) {
    updateData.variantImage = variantImageUrl;
  }

  await productModel.update({
    where: { id },
    data: updateData,
  });

  // Handle Gallery (newly uploaded ones)
  for (const file of galleryFiles) {
    const url = await handleFileUpload(file, "products/gallery");
    if (url) {
      await (prisma as any).productImage.create({
        data: { url, productId: id }
      });
    }
  }

  // Handle Documents (newly uploaded ones)
  for (const file of documentFiles) {
    const url = await handleFileUpload(file, "products/documents");
    if (url) {
      await (prisma as any).productDocument.create({
        data: { name: file.name, url, productId: id }
      });
    }
  }

  // Handle Variants
  const variantDataStrings = formData.getAll("variantData[]") as string[];

  // Delete old variants and add new ones
  await (prisma as any).productVariant.deleteMany({ where: { productId: id } });
  
  for (let i = 0; i < variantDataStrings.length; i++) {
    const dataStr = variantDataStrings[i];
    try {
      const data = JSON.parse(dataStr);

      // Check for variant specific image
      const variantImageFile = formData.get(`variantImage_${i}`) as File;
      if (variantImageFile && variantImageFile.size > 0) {
        const url = await handleFileUpload(variantImageFile, "products/variants");
        if (url) {
          data.variantImage = url;
        }
      }

      await (prisma as any).productVariant.create({
        data: {
          data,
          productId: id,
        }
      });
    } catch (e) {
      console.error("Error saving variant:", e);
    }
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  await productModel.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function duplicateProduct(id: number) {
  const original = await productModel.findUnique({
    where: { id },
    include: {
      variants: true,
      gallery: true,
      documents: true,
    },
  });

  if (!original) throw new Error("Product not found");

  const newName = await generateUniqueProductName(original.name);
  const newSlug = await generateProductSlug(newName);

  // Extract base SKU and add incremental suffix to ensure uniqueness
  let newSku = original.sku;
  if (original.sku) {
    const baseSku = original.sku.replace(/-COPY(-\d+)?$/, "");
    let count = 1;
    newSku = `${baseSku}-COPY-${count}`;
    while (true) {
      const existing = await productModel.findFirst({ where: { sku: newSku } });
      if (!existing) break;
      count++;
      newSku = `${baseSku}-COPY-${count}`;
    }
  }

  const product = await productModel.create({
    data: {
      name: newName,
      slug: newSlug,
      sku: newSku,
      modelNo: original.modelNo,
      ean: original.ean,
      description: original.description,
      categoryId: original.categoryId,
      material: original.material,
      packaging: original.packaging,
      origin: original.origin,
      shippingDetails: original.shippingDetails,
      mainImage: original.mainImage,
      variantImage: original.variantImage,
      isActive: false, // Set to draft by default
      showOnHome: original.showOnHome,
      relatedCategoryId: original.relatedCategoryId,
      youMightAlsoCategoryId: original.youMightAlsoCategoryId,
      variants: {
        create: original.variants.map((v: any) => ({
          data: v.data,
        })),
      },
      gallery: {
        create: original.gallery.map((img: any) => ({
          url: img.url,
        })),
      },
      documents: {
        create: original.documents.map((doc: any) => ({
          name: doc.name,
          url: doc.url,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  return product;
}

export async function deleteProductDocument(docId: number, productId: number) {
  await (prisma as any).productDocument.delete({
    where: { id: docId }
  });
  revalidatePath(`/admin/products/edit/${productId}`);
}

export async function deleteProductImage(imageId: number, productId: number) {
  await (prisma as any).productImage.delete({
    where: { id: imageId }
  });
  revalidatePath(`/admin/products/edit/${productId}`);
}
