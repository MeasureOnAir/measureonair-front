import React from 'react'

const Toolbar = ({props}) => {
  return (
    <div style={{width: "80%", height: "50px", border: "2px solid black"}}>
      <span>
          <span onClick={() => props.setCurrentTool(0)}> ✋ </span> | 
          <span onClick={() => props.setCurrentTool(1)}> 📍 </span> | 
          <span onClick={() => props.setCurrentTool(2)}> 📏 </span> | 
      </span>
    </div>
  )
}

export default Toolbar