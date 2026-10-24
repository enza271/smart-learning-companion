import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

export default function StudentDashboard({ materials = [] }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = !subject || item.subject === subject;
      return matchesSearch && matchesSubject;
    });
  }, [materials, search, subject]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Student Dashboard</h2>
          <small className="text-muted">Welcome, {user?.name}</small>
        </div>
        <LogoutButton />
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label">Search materials</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Filter by subject</label>
              <select className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">All subjects</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Programming">Programming</option>
              </select>
            </div>
            <div className="col-md-3 text-md-end">
              <Link to="/profile" className="btn btn-outline-primary">My Profile</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {filteredMaterials.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-light border">No materials found for the selected search and subject.</div>
          </div>
        ) : (
          filteredMaterials.map((item) => (
            <div className="col-md-6 col-xl-4" key={item._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">{item.subject}</span>
                    <small className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</small>
                  </div>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-secondary">{item.description}</p>
                  <div className="mt-auto">
                    <small className="d-block text-muted mb-2">Teacher: {item.uploadedBy?.name || 'Course Staff'}</small>
                    <a className="btn btn-success btn-sm" href={item.fileUrl} target="_blank" rel="noreferrer">
                      View / Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
