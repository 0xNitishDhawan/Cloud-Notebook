import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials]=useState({"email":"","password":""});
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });
          const json =await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate('/')
            props.showAlert("Logged in Successfully","success")
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
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name='email' />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password'/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default Login