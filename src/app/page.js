'use client'
import { Fragment, useEffect, useState } from "react";
import CustomNavbar from "./Components/CustomNavbar";
import TodoCard from "./Components/TodoCard";
import TodoForm from "./Components/TodoForm";
import { useRouter } from "next/navigation";
import { routes } from "./utils/routes";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest } from "./Redux/actions";
import { toast } from "react-toastify";

export default function Home() {

  const router = useRouter()
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([])
  const [allTodos, setAllTodos] = useState([])
  const { data = [], loading = false, error = null } = useSelector(
    (state) => state || {}
  );

  const readTodo = () => {
    const todo = JSON.parse(localStorage.getItem('todo')) 
    setAllTodos(todo)
    setTodos(todo)
  }

  const handleDelete = (i) => {
    const allTodos = [...todos]
    allTodos.splice(i, 1)
    localStorage.setItem('todo', JSON.stringify(allTodos))
    readTodo()
  }

  const sorting = (e) => {
    const sortTodos = [...todos]
    if (e == 'ascending') {
      sortTodos.sort((a, b) => {return a.priority - b.priority})
      setTodos(sortTodos)      
    } else if (e == 'descending') {
      sortTodos.sort((a, b) => {return b.priority - a.priority})
      setTodos(sortTodos)      
    } else {
      setTodos(allTodos)
    }
  }

  useEffect(() => {
    const getUser = localStorage.getItem('user')
    if (!getUser) {
      router.push(routes.SIGNIN)
      return
    }
    readTodo()
  }, [])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchDataRequest(latitude, longitude)); 
        },
        (error) => {
          toast.error("Error getting location");
        }
      );
    } else {
      toast.error("Geolocation is not available in this browser.");
    }
  }, [dispatch])

  return (
    <>
      <CustomNavbar/>
      <div className="bg-dark mt-0 pb-5">
        <TodoForm readTodo={readTodo}/>
        <div className="container mt-4">
          <div className="mb-4">
            <select 
                className="form-select bg-dark border text-light" 
                id='sort'
                onChange={(e) => sorting(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="descending">High to low</option>
                <option value="ascending">Low to high</option>
            </select>
          </div>
          {todos?.length > 0 ? (
            <div className="row g-4">
              {todos?.map((item, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4">
                  <Fragment>
                    <TodoCard
                      task={item.task}
                      priority={item.priority}
                      activityType={item.activityType}
                      onDelete={() => handleDelete(i)}
                      temp={data?.main?.temp ? data?.main?.temp : null}
                      desc={data?.weather ? data?.weather[0]?.description : null}
                    />
                  </Fragment>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No tasks available</p>
          )}
        </div>
      </div>
    </>
  );
}
