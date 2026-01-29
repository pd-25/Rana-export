import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CategoryFormEdit from "@/app/admin/categories/edit/[id]/CategoryFormEdit";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) return notFound();

  const category = await (prisma as any).category.findUnique({
    where: { id: categoryId }
  });

  if (!category) return notFound();

  const parents = await (prisma as any).category.findMany({
    where: { parentId: null, id: { not: categoryId } },
    select: { id: true, name: true }
  });

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <Link href="/admin/categories" className="text-decoration-none small">
          <i className="bi bi-arrow-left me-1"></i> Back to Categories
        </Link>
        <h1 className="h3 mt-2">Edit Category: {category.name}</h1>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="admin-card">
            <CategoryFormEdit category={category} parents={parents} />
          </div>
        </div>
      </div>
    </div>
  );
}
