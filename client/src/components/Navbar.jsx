import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Smart Learning Companion
        </Link>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-light btn-sm" to="/login">
            Login
          </Link>
          <Link className="btn btn-light btn-sm" to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
