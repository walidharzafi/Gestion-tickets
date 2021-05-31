import React from 'react'
import  { Link } from 'react-router-dom'


function SideBare( props) {
   const { side } = props
    return (
       
            <nav id="sidebar"  className= {side ? 'nav-menu active' : 'nav-menu'}>
                <div className="sidebar-header">
                    <h3> Welcome to Ticket System</h3>
                </div>

                <ul className="list-unstyled components">
                    <p> Dashboard Admin</p>
                    <li>
                        <Link to="/users"> All Users</Link>
                    </li>
                    <li>
                        <Link to="/tickets">All Ticket</Link>
                    </li>
                    <li>
                        <Link to="/addDepartment">Add Departement</Link>
                    </li>
                    <li>
                        <Link to="/allDepartment"> All Department</Link>
                    </li>
                </ul>

                <ul className="list-unstyled CTAs">
                    <li>
                        <Link to="/logout" className="article"> Logout </Link>
                    </li>
                </ul>
            </nav>
            

    )
}

export default SideBare
