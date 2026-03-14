import React from "react";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CheckoutContent from "@/components/checkout/CheckoutContent";
import { getDeliveryPartners } from "@/app/actions/deliveryPartnerActions";

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login?callbackUrl=/checkout");
  }

  const cartItems = await (prisma as any).cartItem.findMany({
    where: { userId: session.userId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          mainImage: true,
        },
      },
    },
  });

  if (cartItems.length === 0) {
    redirect("/cart");
  }

  const user = await (prisma as any).user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true },
  });

  const partners = await getDeliveryPartners();

  return (
    <main>
      <CheckoutContent
        cartItems={JSON.parse(JSON.stringify(cartItems))}
        partners={JSON.parse(JSON.stringify(partners))}
        initialUser={user}
      />
    </main>
  );
}
