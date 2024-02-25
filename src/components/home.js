import React from 'react'
import Notes from './notesec'

const Home = (props) => {
  const {showAlert}=props;
  return (
    <>
    <Notes showAlert={showAlert} />
    </>
  )
}

export default Home