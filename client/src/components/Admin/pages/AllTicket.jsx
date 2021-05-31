import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function AllTicket() {
    const [infos, setInfos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4040/api/ticket/allTicketUser')
        .then(response => {
            const Data = response.data
            console.log(Data);
            setInfos(Data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const deleteTicket = (id) => {
        axios.delete(`http://localhost:4040/api/ticket/deleteTicket/${id}`)
        .then((response) => {
            setInfos(
                infos.filter((ticket) => {
                  return ticket._id !== id;
                })
              );
        })
    }

    return (
        <div className="container-fluid">
            <h1 className = "mb-3 mt-3">List of All Users</h1>
            {infos.map((ticket, index) => {
                return  <div className="row d-inline-flex">
                <div className="col-md-3 p-2">  
                    <div key= {index} className="card mr-5" style={{width: "18rem"}}>
                        <div className="card-header ">
                            {ticket.title}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"> {ticket.ticket_type}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{ticket.urgent}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{ticket.etat}</h6>
                            <p className="card-text">{ticket.description}</p>
                            <Link to={`/assign/${ticket._id}`} >
                            <button type="button" className="btn btn-outline-info btn-sm mr-2">Assign</button>
                            </Link>
                            <button type="button" className="btn btn-outline-danger btn-sm ml-5" onClick={()=> { deleteTicket(ticket._id) }} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            })}
               
        </div>
    )
}

export default AllTicket
