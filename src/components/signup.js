import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

    
const Signup = (props) => {
    const [credentials, setCredentials]=useState({"name":"","email":"","password":"","cpassword":""});
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {name, email, password}=credentials;
        const response = await fetch(`https://cloud-notebook-qf2x.onrender.com/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
          });
          const json =await response.json();
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate('/')
            props.showAlert("Account Created Successfully","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value});
    }
  return (
    <>
      <h2 className='mt-1'>Create your account at iNotebook</h2>
      <form className='mt-2' onSubmit={handleSubmit}>
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
              <input type="current-password" className="form-control" id="password" onChange={onChange} value={credentials.password} minLength={5} required name='password'/>
          </div>
          <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Password</label>
              <input type="current-password" className="form-control" id="cpassword" onChange={onChange} value={credentials.cpassword} minLength={5} required name='cpassword'/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Signup