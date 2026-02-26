"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// Define a safe type for the client models to avoid lint errors if generation is slightly behind
const categoryModel = (prisma as any).category;
import { redirect } from "next/navigation";

async function generateSlug(name: string) {
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with -
    .replace(/^-+|-+$/g, ""); // Trim -

  let originalSlug = slug;
  let count = 1;

  while (true) {
    const existing = await categoryModel.findUnique({ where: { slug } });

    if (!existing) break;
    slug = `${originalSlug}-${count}`;
    count++;
  }

  return slug;
}

async function handleFileUpload(file: File | null) {
  if (!file || file.size === 0 || !(file instanceof File)) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public/uploads/categories");
  
  // Ensure directory exists
  await fs.mkdir(uploadDir, { recursive: true });
  
  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);
  
  return `/uploads/categories/${filename}`;
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;
  const isActive = formData.get("isActive") === "on";
  const parentIdStr = formData.get("parentId") as string;
  const parentId = parentIdStr ? parseInt(parentIdStr) : null;

  const showOnHome = formData.get("showOnHome") === "on";
  const subHeading = formData.get("subHeading") as string;

  const slug = await generateSlug(name);
  const imageUrl = await handleFileUpload(imageFile);

  await categoryModel.create({
    data: { 
      name, 
      slug, 
      description, 
      image: imageUrl, 
      isActive,
      showOnHome: parentId ? false : showOnHome, // Only parent can show on home
      subHeading,
      parentId: parentId || null
    },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;
  const isActive = formData.get("isActive") === "on";
  const parentIdStr = formData.get("parentId") as string;
  const parentId = parentIdStr ? parseInt(parentIdStr) : null;

  const showOnHome = formData.get("showOnHome") === "on";
  const subHeading = formData.get("subHeading") as string;

  const updateData: any = { 
    name, 
    description, 
    isActive,
    showOnHome: parentId ? false : showOnHome, // Only parent can show on home
    subHeading,
    parentId: parentId || null
  };
  
  const imageUrl = await handleFileUpload(imageFile);
  if (imageUrl) {
    updateData.image = imageUrl;
  }

  await categoryModel.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: number) {
  await categoryModel.delete({ where: { id } });
  revalidatePath("/admin/categories");
}
