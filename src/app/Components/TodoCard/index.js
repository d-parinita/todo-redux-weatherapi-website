import React from 'react'
import { FaTrash } from "react-icons/fa";

export default function TodoCard({ task, onDelete, priority, desc, temp, activityType }) {
  return (
    <>
      <div className="card bg-dark text-light p-3 border mb-3" style={{ maxWidth: "400px", width: "100%", minHeight: "120px" }}>
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{task}</h5>
                <FaTrash className="text-light cursor-pointer" onClick={onDelete} />
            </div>
            <div className='d-flex align-items-center'>
              <span style={{maxWidth: 'fit-content'}} className={`badge rounded-pill mt-2 ${priority == 3 ? "bg-danger" : priority == 2 ? "bg-warning" : "bg-success"}`}>
                  {priority == 3 ? "High" : priority == 2 ? "Medium" : "Low"}
              </span>
              <span style={{maxWidth: 'fit-content'}} className='badge rounded-pill mt-2 ms-2 bg-light text-dark'>
                  {activityType}
              </span>
            </div>
            {activityType == 'Outdoor' ? (
              <div className="mt-2">
                  Weather: {desc} , Temp: {temp} F
              </div>
            ) : ''}
        </div>  
    </>
  )
}
