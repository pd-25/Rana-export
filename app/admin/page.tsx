import React from "react";

export default function AdminDashboard() {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard Overview</h1>
        <button className="btn btn-primary btn-sm">
          <i className="bi bi-download me-2"></i>Generate Report
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="admin-card">
            <div className="stat-icon bg-primary bg-opacity-10 text-primary">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <h6 className="text-muted mb-1">Total Sales</h6>
            <h3 className="mb-0">$24,500</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-card">
            <div className="stat-icon bg-success bg-opacity-10 text-success">
              <i className="bi bi-cart-check"></i>
            </div>
            <h6 className="text-muted mb-1">New Orders</h6>
            <h3 className="mb-0">125</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-card">
            <div className="stat-icon bg-info bg-opacity-10 text-info">
              <i className="bi bi-people"></i>
            </div>
            <h6 className="text-muted mb-1">Total Customers</h6>
            <h3 className="mb-0">842</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-card">
            <div className="stat-icon bg-warning bg-opacity-10 text-warning">
              <i className="bi bi-graph-up"></i>
            </div>
            <h6 className="text-muted mb-1">Growth</h6>
            <h3 className="mb-0">+12%</h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="admin-card">
            <h5 className="mb-4">Recent Transactions</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Template</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Modern Portfolio</td>
                    <td>Jan 24, 2026</td>
                    <td><span className="badge bg-success-subtle text-success">Completed</span></td>
                    <td>$89.00</td>
                  </tr>
                  <tr>
                    <td>E-commerce Pro</td>
                    <td>Jan 23, 2026</td>
                    <td><span className="badge bg-warning-subtle text-warning">Pending</span></td>
                    <td>$129.00</td>
                  </tr>
                  <tr>
                    <td>Minimalist Blog</td>
                    <td>Jan 22, 2026</td>
                    <td><span className="badge bg-success-subtle text-success">Completed</span></td>
                    <td>$45.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="admin-card">
            <h5 className="mb-4">Quick Links</h5>
            <div className="list-group list-group-flush">
              <a href="/admin/categories" className="list-group-item list-group-item-action px-0 border-0 d-flex justify-content-between">
                Manage Categories <i className="bi bi-chevron-right"></i>
              </a>
              <a href="/admin/products" className="list-group-item list-group-item-action px-0 border-0 d-flex justify-content-between">
                Manage Products <i className="bi bi-chevron-right"></i>
              </a>
              <a href="/" className="list-group-item list-group-item-action px-0 border-0 d-flex justify-content-between">
                View Site <i className="bi bi-box-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
