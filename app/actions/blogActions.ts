"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";

const blogModel = (prisma as any).blog;

async function handleFileUpload(file: File | null, subfolder: string = "blogs") {
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

async function generateBlogSlug(title: string, excludeId?: number) {
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let originalSlug = slug;
  let count = 1;

  while (true) {
    const existing = await blogModel.findFirst({ 
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

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const author = formData.get("author") as string;
  const isActive = formData.get("isActive") === "on";
  const imageFile = formData.get("image") as File;

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const slug = await generateBlogSlug(title);
  const imageUrl = await handleFileUpload(imageFile);

  await blogModel.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      author,
      isActive,
      image: imageUrl,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updateBlog(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const author = formData.get("author") as string;
  const isActive = formData.get("isActive") === "on";
  const imageFile = formData.get("image") as File;

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const slug = await generateBlogSlug(title, id);
  const imageUrl = await handleFileUpload(imageFile);

  const updateData: any = {
    title,
    slug,
    content,
    excerpt,
    author,
    isActive,
  };

  if (imageUrl) {
    updateData.image = imageUrl;
  }

  await blogModel.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlog(id: number) {
  await blogModel.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}

export async function toggleBlogStatus(id: number, isActive: boolean) {
  await blogModel.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}
