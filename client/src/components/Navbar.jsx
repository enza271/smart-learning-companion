import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Smart Learning Companion
        </Link>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          {!user ? (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-light btn-sm" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              {user.role === 'student' && <Link className="btn btn-outline-light btn-sm" to="/student-dashboard">Dashboard</Link>}
              {user.role === 'teacher' && <Link className="btn btn-outline-light btn-sm" to="/teacher-dashboard">Dashboard</Link>}
              {user.role === 'admin' && <Link className="btn btn-outline-light btn-sm" to="/admin-dashboard">Dashboard</Link>}
              <Link className="btn btn-outline-light btn-sm" to="/profile">Profile</Link>
              <button className="btn btn-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
