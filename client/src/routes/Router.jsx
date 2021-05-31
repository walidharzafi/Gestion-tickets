import React, { useContext } from 'react'
import {Route,  Switch } from 'react-router-dom'
import Header from '../components/layout/Header'
import Home from '../components/Home'
import DashboardAdmin from '../components/Admin/Dashboard'
import DashboardTechnic from '../components/Technician/DashboardTechnic'
import ProfileUser from '../components/User/ProfileUser'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Logout from '../components/Logout'
import { AdminRoute, TechnicianRoute, UserRoute, IsAuthenticate } from './ProtectedRoutes'
import { UserContext } from '../contextApi/MyContext'


const Router = () => {

    const { infos:{isAuth , role}} = useContext(UserContext)
    console.table({isAuth , role});
    return (
        <div className="">
        <Header  />
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/logout' component={Logout} />
            <Route exact  path='/signUp' component={SignUp} />
            <IsAuthenticate exact path='/signIn' isAuth={isAuth} role={role} component={SignIn} />
            <AdminRoute exact  path='/dashboard' isAuth={isAuth} role={role} component={DashboardAdmin} />
            <TechnicianRoute exact path='/technician' isAuth={isAuth} role={role} component={DashboardTechnic} />
            <UserRoute exact  path='/profileUser' isAuth={isAuth} role={role} component={ProfileUser} />
          </Switch>
        </div>
      </div>
    )
}

    
export default Router
