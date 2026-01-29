import React from "react";
import { prisma } from "@/lib/prisma";
import { deleteCategory } from "./actions";
import Link from "next/link";

export default async function CategoriesPage() {
  // Fetch categories using Prisma explicitly
  const categories = await (prisma as any).category.findMany({
    include: {
      parent: true,
      children: true,
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Manage Categories</h1>
        <Link href="/admin/categories/new" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>Add New Category
        </Link>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Parent</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat: any) => (
                <tr key={cat.id}>
                  <td>
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                    ) : (
                      <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-image text-muted"></i>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="fw-bold">{cat.name}</div>
                    {cat.description && <div className="small text-muted text-truncate" style={{ maxWidth: '200px' }}>{cat.description}</div>}
                  </td>
                  <td><code>{cat.slug}</code></td>
                  <td>{cat.parent?.name || <span className="text-muted small">None</span>}</td>
                  <td>
                    {cat.isActive ? (
                      <span className="badge bg-success-subtle text-success">Active</span>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary">Inactive</span>
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group">
                      <Link href={`/admin/categories/edit/${cat.id}`} className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteCategory(cat.id);
                      }}>
                        <button type="submit" className="btn btn-outline-danger btn-sm rounded-start-0">
                          <i className="bi bi-trash"></i>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    <i className="bi bi-folder-x fs-1 d-block mb-3"></i>
                    No categories found. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
