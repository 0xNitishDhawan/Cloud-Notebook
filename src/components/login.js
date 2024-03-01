import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials]=useState({"email":"","password":""});
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://cloud-notebook-qf2x.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });
          const json =await response.json();
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully","success")
            navigate('/')
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
        <h2>Login to iNotebook</h2>
        <form className='mt-3' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name='email' />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="current-password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password'/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default Login