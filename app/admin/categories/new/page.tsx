import React from "react";
import { prisma } from "@/lib/prisma";
import { createCategory } from "../actions";
import Link from "next/link";
import CategoryForm from "@/app/admin/categories/new/CategoryForm";

export default async function NewCategoryPage() {
  // Fetch potential parents for the dropdown
  const parents = await (prisma as any).category.findMany({
    where: { parentId: null },
    select: { id: true, name: true }
  });

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <Link href="/admin/categories" className="text-decoration-none small">
          <i className="bi bi-arrow-left me-1"></i> Back to Categories
        </Link>
        <h1 className="h3 mt-2">Add New Category</h1>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="admin-card">
            <CategoryForm parents={parents} />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="admin-card bg-light border-0">
            <h5>Tips</h5>
            <ul className="small text-muted ps-3 mt-3">
              <li className="mb-2"><strong>Slugs</strong> are generated automatically from the name.</li>
              <li className="mb-2"><strong>Parents</strong> allow you to create subcategories.</li>
              <li className="mb-2"><strong>Images</strong> should be around 400x400px for best results.</li>
              <li>Inactive categories won't show on the frontend.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
