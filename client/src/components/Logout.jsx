import React, { useEffect,useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contextApi/MyContext'

const Logout = () => {
    const { setInfos} = useContext(UserContext)
    useEffect(() => {
        axios.get('http://localhost:4040/api/logout')
        .then((response) => setInfos(response.data))
    }, [])
    
    return (
        <>
            <Redirect to="/" />
        </>
    )
}

export default Logout
