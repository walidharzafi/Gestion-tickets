import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { UserContext } from '../../contextApi/MyContext'


const Header = (props) => {
    const { infos:{isAuth }} = useContext(UserContext)

    return (
        <nav class="navbar navbar-expand-sm  text-light bgc py0">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">Ticket System</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">

              <li class="nav-item">
                <NavLink class="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
                { !isAuth ? 
                    ( <>
                        <li className="nav-item">
                            <Link to="/signUp" className="nav-link"> Sign Up </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signIn" className="nav-link"> Sign In </Link>
                        </li>
                    </>) :
                    (<>  
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link"> Logout </Link>
                        </li> 
                    </>) 
                }
            </ul>

          </div>
        </div>
      </nav>  
    )
}

export default Header
