import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await api.get('/materials');
        setMaterials(res.data.materials || []);
      } catch (error) {
        console.error('Materials fetch error:', error);
      }
    };

    if (user) {
      fetchMaterials();
    }
  }, [user]);

  if (!user) {
    return <div className="container py-5">Please log in to access your dashboard.</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Welcome, {user.name}</h2>
      <div className="row g-3">
        {materials.map((material) => (
          <div className="col-md-6 col-xl-4" key={material._id}>
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <span className="badge bg-primary mb-2">{material.subject}</span>
                <h4>{material.title}</h4>
                <p className="text-secondary">{material.description}</p>
                <a className="btn btn-success btn-sm" href={material.fileUrl} target="_blank" rel="noreferrer">Open File</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
