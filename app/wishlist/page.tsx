import React from "react";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import WishlistContent from "@/components/wishlist/WishlistContent";

export const metadata = {
  title: "My Wishlist | Rana Export",
};

export default async function WishlistPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId: session.userId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          mainImage: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <WishlistContent items={JSON.parse(JSON.stringify(items))} />
    </main>
  );
}
