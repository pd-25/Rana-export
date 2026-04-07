"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function placeOrder(formData: FormData) {
  const session = await getSession();
  const userId = session?.userId || null;

  const customerName = formData.get("name") as string;
  const customerEmail = formData.get("email") as string;
  const customerPhone = formData.get("phone") as string;
  const customerAddress = formData.get("address") as string;
  const deliveryPartnerId = formData.get("deliveryPartnerId") ? parseInt(formData.get("deliveryPartnerId") as string) : null;

  if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
    return { error: "Please fill all required fields" };
  }

  try {
    // 0. Upsert Customer to show in Admin
    const customer = await (prisma as any).customer.upsert({
      where: { email: customerEmail },
      update: {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
      },
      create: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
      },
    });

    // 1. Get cart items
    const cartItems = await (prisma as any).cartItem.findMany({
      where: { userId: userId as number },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return { error: "Your cart is empty" };
    }

    // 2. Create Order
    const order = await (prisma as any).order.create({
      data: {
        userId,
        customerId: customer.id,
        customerName,
        customerPhone,
        customerAddress,
        deliveryPartnerId,
        status: "PENDING",
        items: {
          create: cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      }
    });

    // 3. Clear Cart
    await (prisma as any).cartItem.deleteMany({
      where: { userId: userId as number }
    });

    revalidatePath("/cart");
    revalidatePath("/profile");
    revalidatePath("/admin/orders");
    revalidatePath("/admin/customers");
    revalidatePath("/admin");
    
    return { success: "Order placed successfully", orderId: order.id };
  } catch (err) {
    console.error(err);
    return { error: "Failed to place order" };
  }
}

export async function getOrderItems(orderId: number) {
  try {
    return await (prisma as any).orderItem.findMany({
      where: { orderId },
      include: {
        product: {
          include: {
            variants: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getOrderDetails(orderId: number) {
  try {
    return await (prisma as any).order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        deliveryPartner: true,
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}
