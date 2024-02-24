import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

    
const Signup = () => {
    const [credentials, setCredentials]=useState({"name":"","email":"","password":"","cpassword":""});
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name, email, password}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
          });
          const json =await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate('/')
          }
          else{
            alert("Something went wrong");
          }

    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value});
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" onChange={onChange} value={credentials.name} name='name' />
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name='email' />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} minLength={5} required name='password'/>
          </div>
          <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="cpassword" onChange={onChange} value={credentials.cpassword} minLength={5} required name='cpassword'/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Signup