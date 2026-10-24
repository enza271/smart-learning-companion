import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMaterials = async () => {
    try {
      const response = await api.get('/materials');
      setMaterials(response.data.materials || []);
    } catch (error) {
      console.error('Materials fetch error:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Users fetch error:', error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchMaterials();
    if (user.role === 'admin') fetchUsers();
  }, [user]);

  const filteredMaterials = materials.filter((item) => {
    const searchValue = search.toLowerCase();
    const matchSearch = !search || item.title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue);
    const matchSubject = !subject || item.subject === subject;
    return matchSearch && matchSubject;
  });

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !description) {
      setStatus('Please enter title, description and choose a file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject || 'General');
    formData.append('description', description);
    formData.append('file', file);

    try {
      await api.post('/materials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('Material uploaded successfully');
      setTitle('');
      setDescription('');
      setFile(null);
      await fetchMaterials();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/materials/${id}`);
      await fetchMaterials();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Delete failed');
    }
  };

  if (!user) {
    return <div className="container py-5">Please login to access the dashboard.</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Welcome, {user.name}</h2>
          <small className="text-muted text-capitalize">{user.role} dashboard</small>
        </div>
        <button className="btn btn-outline-primary" onClick={() => localStorage.removeItem('smartToken') && window.location.reload()}>
          Logout
        </button>
      </div>

      {user.role === 'teacher' && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Upload Study Material</h4>
            {status && <div className="alert alert-info">{status}</div>}
            <form onSubmit={handleUpload}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="form-control" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <select className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="">Select subject</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>
                <div className="col-12">
                  <textarea className="form-control" rows="3" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
                <div className="col-md-6 text-md-end">
                  <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {(user.role === 'student' || user.role === 'teacher') && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Search by title or keyword" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="col-md-4">
                <select className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option value="">All subjects</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Programming">Programming</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {user.role === 'admin' && users.length > 0 && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h4 className="mb-3">Registered Users</h4>
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
      )}

      <div className="row g-3">
        {filteredMaterials.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-light border">No learning materials found.</div>
          </div>
        ) : (
          filteredMaterials.map((item) => (
            <div className="col-md-6 col-xl-4" key={item._id}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">{item.subject}</span>
                    <small className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</small>
                  </div>
                  <h5>{item.title}</h5>
                  <p className="text-secondary">{item.description}</p>
                  <div className="mt-auto">
                    <small className="d-block text-muted mb-2">Uploaded by: {item.uploadedBy?.name || 'Teacher'}</small>
                    <div className="d-flex gap-2 flex-wrap">
                      <a className="btn btn-success btn-sm" href={item.fileUrl} target="_blank" rel="noreferrer">Open</a>
                      {user.role === 'teacher' && (
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
