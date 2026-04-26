"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";

async function handleFileUpload(file: File | null, subfolder: string = "homepage") {
  if (!file || file.size === 0 || !(file instanceof File)) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Clean filename
  const filename = `${Date.now()}-${file.name.replace(/[^\w.-]/g, "-")}`;
  const uploadDir = path.join(process.cwd(), `public/uploads/${subfolder}`);
  
  await fs.mkdir(uploadDir, { recursive: true });
  
  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);
  
  return `/uploads/${subfolder}/${filename}`;
}

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  const url = await handleFileUpload(file);
  return { url };
}

export async function updateHomeSection(id: number, data: any) {
  await (prisma as any).homeSection.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      isActive: data.isActive,
      content: data.content,
      order: parseInt(data.order) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/homepage");
  redirect("/admin/homepage");
}
