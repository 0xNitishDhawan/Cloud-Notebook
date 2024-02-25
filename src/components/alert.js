import React from 'react'

function Alert(props) {
  const capitalize=(word)=>{
    let str=word.toLowerCase();
    return (str[0].toUpperCase()+str.slice(1));
  }
  return (
    <div className="container" style={{height:'50px'}}>
    {props.alert &&<div className={`alert alert-${props.alert.type}`} role="alert">
       <strong>{capitalize(props.alert.type==="danger"?"error":props.alert.type)}:</strong> {props.alert.message}
    </div>}
    </div>
  )
}

export default Alert
 