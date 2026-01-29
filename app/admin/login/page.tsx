"use client";
import React, { useState } from "react";
import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="text-center mb-4">
          <h1 className="login-title">Sign In</h1>
          <p className="login-subtitle">Enter your credentials to access admin panel</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger py-2 small mb-3 border-0 rounded-3">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small fw-semibold text-muted">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-minimal"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label small fw-semibold text-muted mb-0">Password</label>
              <a href="#" className="small text-decoration-none">Forgot?</a>
            </div>
            <input
              type="password"
              name="password"
              className="form-control form-control-minimal"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-minimal"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="small text-muted mb-0">© 2026 Rana Export. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
