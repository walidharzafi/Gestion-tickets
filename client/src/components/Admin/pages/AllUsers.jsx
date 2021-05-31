import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AllUsers() {
    const [infos, setInfos] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4040/api/allUser')
        .then(response => {
            const Data = response.data
            console.log(Data);
            setInfos(Data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const activateAccount = (id) => {
        axios.put(`http://localhost:4040/api/activate/${id}`)
        .then((response) => {
        //    console.log(response.data.message);
           setMessage(response.data.message)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1 className = "mb-3 mt-3">List of All Users</h1>
            {message ?  <div class="alert alert-primary mt-3" role="alert">
                        {message}
                        </div> 
            : null}
            <table className="table ">
                <thead className='bgc'>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department</th>
                        <th scope="col">Active</th>
                    </tr>
                </thead>
                <tbody>
                {infos.map((user, index) => {
                        return <tr key= {index}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.departement_id.name}</td>
                        {user.active === false ? 
                        <td>
                        <button type="button" class="btn btn-outline-info" onClick={() => {activateAccount(user._id)}}> Activer </button>
                        </td>
                        : <span class="badge bg-info">Activated</span>
                        }
                        
                    </tr>
                })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers
