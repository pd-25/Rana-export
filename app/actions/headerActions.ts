"use server";

import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function getHeaderData() {
  const session = await getSession();

  if (!session) {
    return { isLoggedIn: false, cartCount: 0, wishlistCount: 0, userName: null };
  }

  const [cartCount, wishlistCount, user] = await Promise.all([
    prisma.cartItem.count({ where: { userId: session.userId } }),
    prisma.wishlistItem.count({ where: { userId: session.userId } }),
    prisma.user.findUnique({
      where: { id: session.userId },
      select: { name: true },
    }),
  ]);

  return {
    isLoggedIn: true,
    cartCount,
    wishlistCount,
    userName: user?.name ?? null,
  };
}
