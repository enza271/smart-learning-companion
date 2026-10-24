import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

export default function TeacherDashboard({ materials = [] }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Math');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const ownMaterials = useMemo(() => {
    return materials.filter((item) => {
      const uploadedById = item.uploadedBy?._id || item.uploadedBy;
      return uploadedById === user?.id;
    });
  }, [materials, user]);

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please choose a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
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
      const response = await api.get('/materials');
      const refreshed = response.data.materials || [];
      materials.splice(0, materials.length, ...refreshed);
      window.location.reload();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Teacher Dashboard</h2>
          <small className="text-muted">Manage your study resources</small>
        </div>
        <LogoutButton />
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h4 className="mb-3">Upload New Material</h4>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleUpload}>
            <div className="row g-3">
              <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Material title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <select className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
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
                <button className="btn btn-primary" type="submit">Upload Material</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">My Uploaded Materials</h4>
          {ownMaterials.length === 0 ? (
            <div className="alert alert-light border">No materials uploaded yet.</div>
          ) : (
            <div className="row g-3">
              {ownMaterials.map((item) => (
                <div className="col-md-6" key={item._id}>
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-primary">{item.subject}</span>
                      <small className="text-muted">{new Date(item.createdAt).toLocaleDateString()}</small>
                    </div>
                    <h5>{item.title}</h5>
                    <p className="text-secondary mb-3">{item.description}</p>
                    <div className="d-flex gap-2 flex-wrap">
                      <a className="btn btn-outline-success btn-sm" href={item.fileUrl} target="_blank" rel="noreferrer">Open</a>
                      <button className="btn btn-outline-danger btn-sm" onClick={async () => {
                        await api.delete(`/materials/${item._id}`);
                        window.location.reload();
                      }}>Delete</button>
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
