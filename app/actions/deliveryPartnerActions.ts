"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDeliveryPartners() {
  try {
    return await (prisma as any).deliveryPartner.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function addDeliveryPartner(formData: FormData) {
  const name = formData.get("name") as string;
  const logo = formData.get("logo") as string;
  const contactInfo = formData.get("contactInfo") as string;

  try {
    await (prisma as any).deliveryPartner.create({
      data: { name, logo, contactInfo },
    });
    revalidatePath("/admin/delivery-partners");
    return { success: "Partner added" };
  } catch (err) {
    return { error: "Failed to add partner" };
  }
}

export async function updateDeliveryPartner(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const logo = formData.get("logo") as string;
  const contactInfo = formData.get("contactInfo") as string;
  const isActive = formData.get("isActive") === "true";

  try {
    await (prisma as any).deliveryPartner.update({
      where: { id },
      data: { name, logo, contactInfo, isActive },
    });
    revalidatePath("/admin/delivery-partners");
    return { success: "Partner updated" };
  } catch (err) {
    return { error: "Failed to update partner" };
  }
}

export async function deleteDeliveryPartner(id: number) {
  try {
    await (prisma as any).deliveryPartner.delete({ where: { id } });
    revalidatePath("/admin/delivery-partners");
    return { success: "Partner deleted" };
  } catch (err) {
    return { error: "Failed to delete partner" };
  }
}
