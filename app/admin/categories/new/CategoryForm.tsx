"use client";
import React, { useState } from "react";
import { createCategory } from "../actions";

export default function CategoryForm({ parents }: { parents: any[] }) {
  const [loading, setLoading] = useState(false);

  return (
    <form action={async (formData) => {
      setLoading(true);
      await createCategory(formData);
      // createCategory will redirect or revalidate
    }}>
      <div className="mb-4">
        <label className="form-label fw-bold">Category Name</label>
        <input 
          type="text" 
          name="name" 
          className="form-control form-control-minimal" 
          placeholder="e.g. Cotton Fabrics" 
          required 
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Parent Category (Optional)</label>
        <select name="parentId" className="form-select form-control-minimal">
          <option value="">None (Top Level)</option>
          {parents.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Description</label>
        <textarea 
          name="description" 
          className="form-control form-control-minimal" 
          rows={4}
          placeholder="Describe this category..."
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Category Image</label>
        <input 
          type="file" 
          name="image" 
          className="form-control form-control-minimal" 
          accept="image/*"
        />
      </div>

      <div className="mb-4 d-flex align-items-center">
        <div className="form-check form-switch p-0 d-flex align-items-center">
          <input 
            className="form-check-input" 
            type="checkbox" 
            name="isActive" 
            id="isActive" 
            defaultChecked 
            style={{ width: '40px', height: '20px', marginLeft: '0', marginRight: '10px' }}
          />
          <label className="form-check-label fw-bold" htmlFor="isActive">
            Active
          </label>
        </div>
      </div>

      <div className="mt-5 pt-4 border-top">
        <button 
          type="submit" 
          className="btn btn-primary px-5 btn-minimal"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Category"}
        </button>
      </div>
    </form>
  );
}
