import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate=useNavigate();
  useEffect(() => {  
    if(!localStorage.getItem('token')){
      navigate('/login');
    }    // eslint-disable-next-line
  }, [])
  
  return (
    <div>This is about  page</div>
  )
}

export default About