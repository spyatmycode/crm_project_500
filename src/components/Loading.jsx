import React from 'react'
import loading2 from '../assets/785 (1).gif'

const Loading = ({loading}) => {
  return (
    
        (loading === false) ? <></> : <div className="w-full h-full fixed backdrop-blur-[1px] top-0 bg-white bg-opacity-5 flex justify-center items-center flex-col ">
        <img src={loading2} alt="" width={"50px"} className="" />
        </div>
    
  )
}

export default Loading

{/* <div className="w-full h-full fixed backdrop-blur-[1px] top-0 bg-white bg-opacity-5 flex justify-center items-center flex-col ">
<img src={loading2} alt="" width={"50px"} className="" />
</div> */}