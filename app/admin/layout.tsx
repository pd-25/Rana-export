"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="admin-wrapper" style={{ display: isLoginPage ? 'block' : 'flex' }}>
      {!isLoginPage && (
        <aside className="admin-sidebar shadow-sm">
          <Link href="/admin" className="sidebar-logo">
            Rana Admin
          </Link>
          
          <nav className="mt-4">
            <Link 
              href="/admin" 
              className={`admin-nav-link ${pathname === '/admin' ? 'active' : ''}`}
            >
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </Link>
            
            <Link 
              href="/admin/categories" 
              className={`admin-nav-link ${pathname.startsWith('/admin/categories') ? 'active' : ''}`}
            >
              <i className="bi bi-grid"></i>
              Categories
            </Link>
            
            <Link 
              href="/admin/products" 
              className={`admin-nav-link ${pathname.startsWith('/admin/products') ? 'active' : ''}`}
            >
              <i className="bi bi-box-seam"></i>
              Products
            </Link>

            <div className="mt-5 pt-5 border-top">
              <form action={async () => {
                const { logoutAdmin } = await import("@/app/admin/logout/actions");
                await logoutAdmin();
              }}>
                <button type="submit" className="admin-nav-link text-danger w-100 border-0 bg-transparent text-start">
                  <i className="bi bi-box-arrow-right"></i>
                  Sign Out
                </button>
              </form>
            </div>
          </nav>
        </aside>
      )}

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
