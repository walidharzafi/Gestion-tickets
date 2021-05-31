import React, {useState, useEffect} from 'react'
import axios from 'axios'

function AllDepartment() {
    const [infos, setInfos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4040/api/department/allDepartment')
        .then(response => {
            const Data = response.data
            // console.log(Data);
            setInfos(Data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            <h1 className = "mb-3 mt-3">List of All Users</h1>
            <table className="table ">
                <thead className='bgc'>
                    <tr>
                        <th scope="col">Department Name</th>
                        <th scope="col"> Administrator</th>
                        <th scope="col">Created At</th>
                    </tr>
                </thead>
                <tbody>
                {infos.map((department, index) => {
                        return <tr key= {index}>
                        <td>{department.name}</td>
                        <td>{department.administrator}</td>
                        <td>{department.created_at}</td>
                        
                    </tr>
                })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default AllDepartment
