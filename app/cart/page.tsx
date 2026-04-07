import React from "react";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CartContent from "@/components/cart/CartContent";

export const metadata = {
  title: "Shopping Cart | Rana Export",
};

export default async function CartPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const items = await prisma.cartItem.findMany({
    where: { userId: session.userId },
    include: {
      product: {
        include: {
          variants: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <CartContent items={JSON.parse(JSON.stringify(items))} />
    </main>
  );
}
