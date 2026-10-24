import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <section className="hero-section py-5">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <p className="text-primary fw-semibold mb-2">Smart Learning Companion</p>
              <h1 className="display-5 fw-bold mb-3">A smarter way to share and access learning materials.</h1>
              <p className="lead text-secondary mb-4">
                Teachers upload notes, PDFs, and presentations. Students search, filter, and access study resources quickly.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link className="btn btn-primary btn-lg" to="/register">Get Started</Link>
                <Link className="btn btn-outline-primary btn-lg" to="/login">Login</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4">
                  <div className="mb-3"><span className="badge bg-success-subtle text-success">Teacher uploads</span></div>
                  <div className="mb-3"><span className="badge bg-info-subtle text-info">Student search</span></div>
                  <div className="mb-3"><span className="badge bg-warning-subtle text-warning">Admin control</span></div>
                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                    <div>
                      <div className="fw-semibold">Study library</div>
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
    </div>
  );
};

export default LandingPage;
