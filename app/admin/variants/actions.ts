"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createVariantGroup(data: { name: string; fields: string[] }) {
  const group = await (prisma as any).variantGroup.create({
    data: {
      name: data.name,
      fields: data.fields,
    },
  });
  revalidatePath("/admin/variants");
  return group;
}

export async function updateVariantGroup(id: number, data: { name: string; fields: string[] }) {
  const group = await (prisma as any).variantGroup.update({
    where: { id },
    data: {
      name: data.name,
      fields: data.fields,
    },
  });
  revalidatePath("/admin/variants");
  return group;
}

export async function deleteVariantGroup(id: number) {
  await (prisma as any).variantGroup.delete({ where: { id } });
  revalidatePath("/admin/variants");
}

export async function createVariantGroupItem(groupId: number, data: any) {
  const item = await (prisma as any).variantGroupItem.create({
    data: {
      groupId,
      data,
    },
  });
  revalidatePath("/admin/variants");
  return item;
}

export async function updateVariantGroupItem(id: number, data: any) {
  const item = await (prisma as any).variantGroupItem.update({
    where: { id },
    data: { data },
  });
  revalidatePath("/admin/variants");
  return item;
}

export async function deleteVariantGroupItem(id: number) {
  await (prisma as any).variantGroupItem.delete({ where: { id } });
  revalidatePath("/admin/variants");
}
