import React from 'react'
import {Link, useLocation,useNavigate} from "react-router-dom";

export const Navbar = () => {
    let location = useLocation();
    React.useEffect(() => {
    }, [location]);
  
    const navigate = useNavigate();
    const handlelogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
              <Link className="navbar-brand" to="/">iNotebook</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {localStorage.getItem('token') ? <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                      </li> : null}
                      <li className="nav-item">
                          <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">About</Link>
                      </li>
                  </ul>

                {!localStorage.getItem('token') ?<form className='d-flex'>
                        <Link className="btn btn-outline-secondary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-light mx-1" to="/signup" role="button">Signup</Link>
                </form> : <button onClick={handlelogout} className='btn btn-light mx-2'>Logout</button>}

              </div>
          </div>
      </nav>
  )
}
