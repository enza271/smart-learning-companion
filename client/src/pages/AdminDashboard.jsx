import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

export default function AdminDashboard({ materials = [] }) {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, materials: 0 });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [dashboardRes, usersRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/users'),
        ]);

        setStats(dashboardRes.data.stats || { users: 0, materials: 0 });
        setUsers(usersRes.data.users || []);
      } catch (error) {
        console.error('Admin dashboard error:', error);
      }
    };

    if (user?.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const removeMaterial = async (materialId) => {
    try {
      await api.delete(`/admin/materials/${materialId}`);
      window.location.reload();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Admin Dashboard</h2>
          <small className="text-muted">Platform management</small>
        </div>
        <LogoutButton />
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="text-muted">Registered Users</h5>
              <h2 className="text-primary">{stats.users}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="text-muted">Uploaded Materials</h5>
              <h2 className="text-success">{stats.materials}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h4 className="mb-3">Users</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((entry) => (
                  <tr key={entry._id}>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td className="text-capitalize">{entry.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">All Materials</h4>
          {materials.length === 0 ? (
            <div className="alert alert-light border">No materials to review.</div>
          ) : (
            <div className="row g-3">
              {materials.map((item) => (
                <div className="col-md-6" key={item._id}>
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-primary">{item.subject}</span>
                      <small className="text-muted">{item.uploadedBy?.name || 'Unknown'}</small>
                    </div>
                    <h5>{item.title}</h5>
                    <p className="text-secondary">{item.description}</p>
                    <div className="d-flex gap-2 flex-wrap">
                      <a className="btn btn-outline-success btn-sm" href={item.fileUrl} target="_blank" rel="noreferrer">Open</a>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => removeMaterial(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
