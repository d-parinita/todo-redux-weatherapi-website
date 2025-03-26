'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function TodoForm({ readTodo }) {

    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [activityType, setActivityType] = useState("Outdoor");

    const handleAdd = (e) => {
        e.preventDefault()
        const allTodos = []
        const prevTodo = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : ''
        const todo = {
            task: task,
            priority: priority,
            activityType: activityType
        }
        allTodos.push(...prevTodo, todo)
        localStorage.setItem('todo', JSON.stringify(allTodos))
        toast.success("Task added")
        readTodo()
    };

  return (
    <>
       <div className="container py-5 d-flex justify-content-center">
            <form onSubmit={(e) => handleAdd(e)} className="card bg-dark text-light p-4 border" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="mb-3">
                    <label htmlFor="task" className="form-label">Task</label>
                    <input 
                        type="text" 
                        className="form-control bg-dark border text-light" 
                        id="task"
                        value={task} 
                        onChange={(e) => setTask(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="d-block">Activity Type:</label>
                    <div className="form-check form-check-inline pt-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="activityType" 
                            value="Outdoor" 
                            checked={activityType === "Outdoor"} 
                            onChange={() => setActivityType("Outdoor")}
                        />
                        <label className="form-check-label">Outdoor</label>
                    </div>
                    <div className="form-check form-check-inline pt-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="activityType" 
                            value="Indoor" 
                            checked={activityType === "Indoor"} 
                            onChange={() => setActivityType("Indoor")}
                        />
                        <label className="form-check-label">Indoor</label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="priority" className="form-label">Add Priority</label>
                    <select 
                        className="form-select bg-dark border text-light" 
                        id='priority'
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="3">High</option>
                        <option value="2">Medium</option>
                        <option value="1">Low</option>
                    </select>
                </div>
                <button type='submit' className="btn bg-light text-dark w-100">Add</button>
            </form>
        </div>
    </>
  )
}
