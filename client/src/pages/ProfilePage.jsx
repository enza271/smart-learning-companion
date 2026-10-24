import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="container py-5">Please log in to view your profile.</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Profile</h2>
          <small className="text-muted">Account details</small>
        </div>
        <LogoutButton />
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-muted">Full Name</label>
              <div className="form-control bg-light">{user.name}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Email</label>
              <div className="form-control bg-light">{user.email}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Role</label>
              <div className="form-control bg-light text-capitalize">{user.role}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted">Account Status</label>
              <div className="form-control bg-light">Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
