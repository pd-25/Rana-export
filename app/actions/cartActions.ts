"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: number, variantId?: number | null, quantity: number = 1) {
  const session = await getSession();
  if (!session) return { error: "Please login to add items to cart" };

  try {
    const existing = await prisma.cartItem.findFirst({
      where: {
        userId: session.userId,
        productId,
        variantId: variantId ?? null,
      },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          userId: session.userId,
          productId,
          variantId: variantId ?? null,
          quantity,
        },
      });
    }

    revalidatePath("/cart");
    return { success: "Item added to cart" };
  } catch (err) {
    console.error(err);
    return { error: "Failed to add item to cart" };
  }
}

export async function removeFromCart(itemId: number) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  try {
    await prisma.cartItem.delete({
      where: { id: itemId, userId: session.userId },
    });
    revalidatePath("/cart");
    return { success: "Item removed" };
  } catch (err) {
    return { error: "Failed to remove item" };
  }
}

export async function updateCartQuantity(itemId: number, quantity: number) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  if (quantity < 1) return removeFromCart(itemId);

  try {
    await prisma.cartItem.update({
      where: { id: itemId, userId: session.userId },
      data: { quantity },
    });
    revalidatePath("/cart");
    return { success: "Quantity updated" };
  } catch (err) {
    return { error: "Failed to update quantity" };
  }
}

export async function clearCart() {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  try {
    await prisma.cartItem.deleteMany({
      where: { userId: session.userId },
    });
    revalidatePath("/cart");
    return { success: "Cart cleared" };
  } catch (err) {
    return { error: "Failed to clear cart" };
  }
}

export async function getCartItems() {
  const session = await getSession();
  if (!session) return [];

  try {
    return await (prisma as any).cartItem.findMany({
      where: { userId: session.userId },
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
