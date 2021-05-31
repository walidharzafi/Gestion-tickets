import React, {useState} from 'react'
import axios from 'axios'

function AddDepartment() {
    const [department, setDepartment] = useState({name:'', administrator: ''})
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setDepartment({
            ...department,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4040/api/department/add', department)
        .then((response) => {
            console.log(response)
            setMessage(response.data.message)
            
        })
        .catch((error) => {
            console.log(error);
        })
        setDepartment({name:'', administrator: ''})
    }
    return (
        <>
           <h2 className='text-center mb-5'>  Add <span className="font-weight-bold "> DEPARTMENT</span> </h2>
            <div className="card border-secondary container" style={{width: "80%"}}>
                <div className="card-header ">
                    Add Department
                </div>
                {message ? <div class="alert alert-primary mt-3" role="alert">
                            {message}
                        </div> : null}
                <form onSubmit={handleSubmit} >
                    <div className="col-md-12 mt-2">
                        <div className="md-form mb-0">
                            <input  type="text" id="name" name="name" className="form-control" onChange= {handleChange} />
                            <label htmlFor="name" className="">Name of Department</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <input  type="text" id="administrator" name="administrator" className="form-control" onChange= {handleChange} />
                            <label htmlFor="administrator" className="">Administrator</label>
                        </div>
                    </div>
                    <hr/>
                    
                    <button  className="btn btn-light float-right mb-3 mr-3 ">
                     Add Department </button>
                </form>

            </div>  
        </>
    )
}

export default AddDepartment
