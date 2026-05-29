import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="nav navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link className="nav-link " to="orders">
                Order
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="staff">
                Staff Page
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="staffdashboard">
                Staff Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navigation;
