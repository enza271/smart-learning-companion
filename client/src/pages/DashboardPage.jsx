import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await api.get('/materials');
        setMaterials(res.data.materials || []);
      } catch (error) {
        console.error('Unable to fetch materials:', error);
      }
    };

    if (user) {
      fetchMaterials();
    }
  }, [user]);

  if (!user) return <div className="container py-5">Please log in to access your dashboard.</div>;

  if (user.role === 'student') return <StudentDashboard materials={materials} />;
  if (user.role === 'teacher') return <TeacherDashboard materials={materials} />;
  if (user.role === 'admin') return <AdminDashboard materials={materials} />;

  return null;
}
