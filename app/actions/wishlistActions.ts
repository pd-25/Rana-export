"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

/** Returns which productIds from the given list are in the current user's wishlist */
export async function getWishlistedIds(productIds: number[]): Promise<number[]> {
  const session = await getSession();
  if (!session || !productIds.length) return [];

  const items = await (prisma as any).wishlistItem.findMany({
    where: { userId: session.userId, productId: { in: productIds } },
    select: { productId: true },
  });
  return items.map((i: { productId: number }) => i.productId);
}

export async function toggleWishlist(productId: number) {
  const session = await getSession();
  if (!session) return { error: "Please login to manage wishlist" };

  try {
    const existing = await (prisma as any).wishlistItem.findFirst({
      where: { userId: session.userId, productId },
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      revalidatePath("/wishlist");
      revalidatePath("/");
      return { success: "Removed from wishlist", action: "removed" };
    } else {
      await (prisma as any).wishlistItem.create({
        data: { userId: session.userId, productId },
      });
      revalidatePath("/wishlist");
      revalidatePath("/");
      return { success: "Added to wishlist", action: "added" };
    }
  } catch (err) {
    console.error(err);
    return { error: "Failed to update wishlist" };
  }
}

export async function removeFromWishlist(itemId: number) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  try {
    await (prisma as any).wishlistItem.delete({
      where: { id: itemId, userId: session.userId },
    });
    revalidatePath("/wishlist");
    return { success: "Item removed" };
  } catch (err) {
    return { error: "Failed to remove item" };
  }
}
