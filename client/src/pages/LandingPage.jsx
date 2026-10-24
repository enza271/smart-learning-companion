import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <section className="hero-section py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <p className="text-primary fw-semibold">Smart Learning Companion</p>
              <h1 className="display-5 fw-bold mb-3">Learn smarter with organized study materials.</h1>
              <p className="lead text-secondary mb-4">
                A modern educational platform where teachers can upload learning resources and students can explore, search, and download them with ease.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link className="btn btn-primary btn-lg" to="/register">
                  Get Started
                </Link>
                <Link className="btn btn-outline-primary btn-lg" to="/login">
                  Login
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <span className="badge bg-success-subtle text-success">Teacher uploads</span>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-info-subtle text-info">Student search</span>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-warning-subtle text-warning">Admin controls</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                    <div>
                      <div className="fw-semibold">Study materials</div>
                      <small className="text-muted">Organized by subject</small>
                    </div>
                    <i className="bi bi-journal-richtext fs-2 text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <i className="bi bi-person-workspace fs-2 text-primary"></i>
                <h4 className="mt-3">Teachers</h4>
                <p className="text-secondary mb-0">Upload notes, PDFs, presentations, and course materials.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <i className="bi bi-mortarboard fs-2 text-primary"></i>
                <h4 className="mt-3">Students</h4>
                <p className="text-secondary mb-0">Browse learning resources by subject and access materials quickly.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <i className="bi bi-shield-check fs-2 text-primary"></i>
                <h4 className="mt-3">Admins</h4>
                <p className="text-secondary mb-0">Manage users and keep the platform secure and organized.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
