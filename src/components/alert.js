import React from 'react'

const alert = (props) => {
  return (
    <>
        <div className="alert alert-primary" role="alert">
            {props.message}
        </div>
    </>
  )
}

export default alert