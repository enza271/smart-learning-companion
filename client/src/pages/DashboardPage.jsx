import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

export default function DashboardPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [materials, setMaterials] = useState([]);
  const [stats, setStats] = useState({ users: 0, materials: 0 });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materialsRes = await api.get('/materials');
        setMaterials(materialsRes.data.materials || []);

        if (user?.role === 'admin') {
          const adminRes = await api.get('/admin/dashboard');
          setStats(adminRes.data.stats || { users: 0, materials: 0 });

          const usersRes = await api.get('/admin/users');
          setUsers(usersRes.data.users || []);
        }
      } catch (error) {
        console.error('Dashboard fetch error', error);
      }
    };

    if (user) fetchData();
  }, [user]);

  const filteredMaterials = materials.filter((item) => {
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = !subject || item.subject === subject;
    return matchesSearch && matchesSubject;
  });

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please choose a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', selectedSubject);
    formData.append('description', description);
    formData.append('file', file);

    try {
      await api.post('/materials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Material uploaded successfully.');
      setTitle('');
      setDescription('');
      setFile(null);
      const materialsRes = await api.get('/materials');
      setMaterials(materialsRes.data.materials || []);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  if (!user) {
    return <div className="container py-5">Please log in to access your dashboard.</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Welcome, {user.name}</h2>
          <small className="text-muted text-capitalize">{user.role} dashboard</small>
        </div>
        <LogoutButton />
      </div>

      {user.role === 'admin' && (
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5>Total Users</h5>
                <h2 className="text-primary">{stats.users}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5>Total Materials</h5>
                <h2 className="text-success">{stats.materials}</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label">Search materials</label>
              <input
                type="text"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title"
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
              <Link to="/" className="btn btn-outline-primary">Home</Link>
            </div>
          </div>
        </div>
      </div>

      {(user.role === 'teacher' || user.role === 'admin') && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Upload Study Material</h4>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleUpload}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <select className="form-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
                    required
                  />
                </div>
                <div className="col-md-6 text-end">
                  <button className="btn btn-primary" type="submit">Upload Material</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {user.role === 'admin' && users.length > 0 && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h4>Registered Users</h4>
            <div className="table-responsive">
              <table className="table table-striped mt-3">
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
      )}

      <div className="row g-3">
        {filteredMaterials.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-light border">No learning materials available for this filter.</div>
          </div>
        ) : (
          filteredMaterials.map((item) => (
            <div className="col-md-6 col-xl-4" key={item._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-primary">{item.subject}</span>
                    <small className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</small>
                  </div>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-secondary">{item.description}</p>
                  <div className="mt-auto">
                    <small className="d-block text-muted mb-2">Uploaded by: {item.uploadedBy?.name || 'Teacher'}</small>
                    <a className="btn btn-success btn-sm" href={`http://localhost:5000${item.fileUrl}`} target="_blank" rel="noreferrer">
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
