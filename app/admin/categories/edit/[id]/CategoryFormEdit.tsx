"use client";
import React, { useState } from "react";
import { updateCategory } from "../../actions";

export default function CategoryFormEdit({ category, parents }: { category: any, parents: any[] }) {
  const [loading, setLoading] = useState(false);

  return (
    <form action={async (formData) => {
      setLoading(true);
      await updateCategory(category.id, formData);
      setLoading(false);
      // Success logic / redirect if needed, but updateCategory usually does revalidatePath
    }}>
      <div className="mb-4">
        <label className="form-label fw-bold">Category Name</label>
        <input 
          type="text" 
          name="name" 
          className="form-control form-control-minimal" 
          defaultValue={category.name} 
          required 
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Parent Category (Optional)</label>
        <select name="parentId" className="form-select form-control-minimal" defaultValue={category.parentId || ""}>
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
          defaultValue={category.description || ""}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Current Image</label>
        {category.image && (
          <div className="mb-2">
            <img src={category.image} alt="current" style={{ width: '100px', borderRadius: '8px' }} />
          </div>
        )}
        <input 
          type="file" 
          name="image" 
          className="form-control form-control-minimal" 
          accept="image/*"
        />
        <small className="text-muted">Leave empty to keep current image</small>
      </div>

      <div className="mb-4 d-flex align-items-center">
        <div className="form-check form-switch p-0 d-flex align-items-center">
          <input 
            className="form-check-input" 
            type="checkbox" 
            name="isActive" 
            id="isActive" 
            defaultChecked={category.isActive}
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
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
