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

  const mainImageFile = formData.get("mainImage") as File;
  const galleryFiles = formData.getAll("gallery") as File[];
  const documentFiles = formData.getAll("documents") as File[];

  const slug = await generateProductSlug(name);
  const mainImageUrl = await handleFileUpload(mainImageFile);

  // Parse variants
  const variantWeights = formData.getAll("variantWeight[]") as string[];
  const variantSizes = formData.getAll("variantSize[]") as string[];
  const variantTotalWeights = formData.getAll("variantTotalWeight[]") as string[];

  const product = await productModel.create({
    data: {
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
      mainImage: mainImageUrl,
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

  // Handle Variants
  const variantFieldNames = formData.getAll("variantFieldName[]") as string[];
  const variantDataStrings = formData.getAll("variantData[]") as string[];

  for (const dataStr of variantDataStrings) {
    try {
      const data = JSON.parse(dataStr);
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

  const mainImageFile = formData.get("mainImage") as File;
  const galleryFiles = formData.getAll("gallery") as File[];
  const documentFiles = formData.getAll("documents") as File[];

  const slug = await generateProductSlug(name, id);
  const mainImageUrl = await handleFileUpload(mainImageFile);

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
  };

  if (mainImageUrl) {
    updateData.mainImage = mainImageUrl;
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
  
  for (const dataStr of variantDataStrings) {
    try {
      const data = JSON.parse(dataStr);
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

export async function deleteProductImage(imageId: number, productId: number) {
  await (prisma as any).productImage.delete({
    where: { id: imageId }
  });
  revalidatePath(`/admin/products/edit/${productId}`);
}
