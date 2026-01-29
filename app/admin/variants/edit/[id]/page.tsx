import React from "react";
import { prisma } from "@/lib/prisma";
import VariantGroupForm from "../../VariantGroupForm";
import { notFound } from "next/navigation";

export default async function EditVariantGroupPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const groupId = parseInt(id);

  if (isNaN(groupId)) return notFound();

  const group = await (prisma as any).variantGroup.findUnique({
    where: { id: groupId }
  });

  if (!group) return notFound();

  return <VariantGroupForm initialData={group} />;
}
