import { Link } from "react-router-dom";

export default function Navbar()
{

  function logout() {
    localStorage.clear();
    window.location.href = '/';
}
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" to="/dashboard">Task Manager</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/dashboard">Dashboard</Link>
        </li>
      
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Task
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/task/a">All Task</Link></li>
            <li><Link className="dropdown-item" to="/task/c">Completed Task</Link></li>
            <li><Link className="dropdown-item" to="/task/p">Pending Task</Link></li>
            <li><Link className="dropdown-item" to="/addtask">Add New Task</Link></li>
            
          </ul>
        </li>
       
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}

      <button className="btn btn-outline-primary" type="submit" onClick={logout}>Logout</button>

    </div>
  </div>
</nav>
        </>
    );
}