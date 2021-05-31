import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios' 

function AssignTicket() {
    const {id } = useParams()
    const [infos, setInfos] = useState([])
    const [technician, setTechnician] = useState([])
    const [assign, setAssign] = useState({technician : ''})
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        // console.log(id);
        axios.get(`http://localhost:4040/api/ticket/infoTicket/${id}`)
        .then(response => {
            const Data = response.data
             console.log(Data)
          setInfos(Data)
        })
        .catch((error) => {
          console.log(error);
        })  
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:4040/api/technician`)
        .then((response) => {
            const Data = response.data
            setTechnician(Data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    const handleChange = (e) => {
        setAssign({
            ...assign,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(assign)
        axios.post(`http://localhost:4040/api/assign/assigned/${id}`, assign)
        .then((data) => {
            if(data) {
                console.log("assignemet", data);
                setMessage(data.data.message)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <h2 className='text-center mb-5'>  Assign <span className="font-weight-bold ">TICKET</span> </h2>
            {message ?  <div class="alert alert-primary mt-3 container" role="alert">
                        {message}
                        </div> 
            : null}
            <div className="card border-secondary container" style={{width: "80%"}}>
                <div className="card-header ">
                    Assign Ticket
                </div>
               
                    <h5 className="card-title mt-3">Title : {infos.title}  </h5>
                    <p className="card-text">Type of Ticket : {infos.ticket_type}  </p>
                    <p className="card-text">State : {infos.urgent}  </p>
                    <p className="card-text">Date : {infos.created_at}   </p>
                
                

                <form onSubmit={handleSubmit} >
                  
                    <div className="col-12">
                        <select name='technician' className="browser-default custom-select mt-3" onChange={handleChange} >
                            <option disabled selected>Select Technician</option>
                            {technician.map((technic, index) => {
                                return  <option key={index}  value={technic._id}> {technic.first_name} {technic.last_name}</option>
                            })}
                           
                        </select>
                    </div>
                    <hr/>
                    
                    <button  className="btn btn-light float-right mb-3 mr-3 ">
                     Assign Ticket </button>
                </form>

            </div> 
        </>
    )
}

export default AssignTicket
