import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DashboardTechnic = () => {
    const [tickets, setTickets] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4040/api/assign/ticketTichnician')
        .then(response => {
            const Data = response.data.map((res) => {
                return res.ticket_Id
            })
            console.log(Data);
            setTickets(Data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const acceptedTicket = (id) => {
        axios.put(`http://localhost:4040/api/assign/accept/${id}`)
        .then((response) => {
        //    console.log(response.data.message);
           setMessage(response.data.message)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const refuseTicket = (id) => {
        axios.put(`http://localhost:4040/api/assign/refuse/${id}`)
        .then((response) => {
        //    console.log(response.data.message);
           setMessage(response.data.message)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <h1>welcome Technician</h1>
            {message ?  <div class="alert alert-primary mt-3" role="alert">
                        {message}
                        </div> 
            : null}
            {tickets.map((ticket, index) => {
                
                    return  <div class="row d-inline-flex">
                    <div class="col-md-3 p-2">
                        {ticket.etat !== 'Non_Affecte' ? 
                        (<>
                        <div key= {index} className="card mr-5" style={{width: "18rem"}}>
                            <div className="card-header ">
                                {ticket.title}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title"> {ticket.ticket_type}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Urgent : {ticket.urgent}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">State : {ticket.etat}</h6>
                                <p className="card-text">Description : {ticket.description}</p>
                                <hr/>
                                {ticket.etat !== 'Cloture' ? 
                                    (<>
                                        <button type="button" className="btn btn-outline-info btn-sm ml-5" onClick={()=> {acceptedTicket(ticket._id)}} >Accept</button>
                                        <button type="button" className="btn btn-outline-danger btn-sm ml-5" onClick={()=> {refuseTicket(ticket._id)}}  >Refuse</button>
                                    </>) : null }
                                
                                
                            </div>
                        </div>
                        </>) : null}
                    </div>
                </div>
                
                
            })}
        </div>
    )
}

export default DashboardTechnic
