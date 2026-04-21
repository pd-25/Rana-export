"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Name, email, and message are required." };
  }

  try {
    const enquiry = await (prisma as any).enquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    revalidatePath("/admin/enquiries");
    return { success: true, enquiryId: enquiry.id };
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}

export async function deleteEnquiry(id: number) {
  try {
    await (prisma as any).enquiry.delete({
      where: { id },
    });
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Delete enquiry error:", error);
    return { error: "Failed to delete enquiry." };
  }
}

export async function updateEnquiryStatus(id: number, status: string) {
  try {
    await (prisma as any).enquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error) {
    console.error("Update enquiry status error:", error);
    return { error: "Failed to update status." };
  }
}

export async function getNewEnquiryCount() {
  try {
    const count = await (prisma as any).enquiry.count({
      where: { status: "NEW" },
    });
    return count;
  } catch (error) {
    console.error("Get new enquiry count error:", error);
    return 0;
  }
}
