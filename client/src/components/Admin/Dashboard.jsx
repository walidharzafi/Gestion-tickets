import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AllUsers from './pages/AllUsers'
import AllTicket from './pages/AllTicket'
import AssignTicket from './pages/AssignTicket' 
import AddDepartment from './pages/AddDepartment' 
import AllDepartment from './pages/AllDepartment' 
import Logout from '../Logout'

import SideBare from './layout/SideBare'
import NavContent from './layout/NavContent'


function Dashboard() {
    const [sideBar, setSideBar] = useState(false)

    const showSidebar = () => {
        setSideBar(!sideBar)
    }
    return (
        <div className="wrapper">
            <Router>
                <SideBare side = {sideBar}/>
                <div id="content">
                    <NavContent viewSideBar={showSidebar} />
                    <Switch>
                        <Route exact path='/users' component= {AllUsers} />
                        <Route exact  path='/tickets' component= {AllTicket} />
                        <Route exact path='/assign/:id' component= {AssignTicket} />
                        <Route exact path='/addDepartment' component= {AddDepartment} />
                        <Route exact path='/allDepartment' component= {AllDepartment} />
                        <Route exact path='/logout' component= {Logout} />
                    </Switch>
                </div>
            </Router>
        </div>
        
    )
}

export default Dashboard
