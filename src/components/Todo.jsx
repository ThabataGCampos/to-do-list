import { useEffect, useState } from "react";
import "./Todo.css";
import FormControl from "./Forms/FormControl";
// import TaskForm from "./Forms/TaskForm";  Exemplo desabilitado

function Todo() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState({
    task_id: ""
  })
  const [newTask, setNewTask] = useState({
    text: ""
  });

  const baseURL= "http://localhost:8000/alltodo";

  async function findAllTasks() {
    const response = await fetch(baseURL)
    const tasks = await response.json()
    setTaskList(tasks)
  }

  async function findOneTask(id){
    const response = await fetch(`${baseURL}/${id}`)
    const task = await response.json()
    setTaskList([task])
  }
  
  async function create(Task){
    const response = await fetch(baseURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(Task)
    })
    const newTask = await response.json()
    setNewTask([newTask])
  }

  useEffect(() => {
    findAllTasks()
  }, [])

  const handleChange = (event) => {
    setTask({...task, [event.target.name]: event.target.value})
  }

  const handleClick = (event) => {
    const task_id_search = task.task_id
    findOneTask(task_id_search)
  }

  const handleChangeCreate = (event) => {
    setNewTask({...newTask, [event.target.name]: event.target.value})
  }

  const handleCreateTask = () => {
    const task_being_created = {...newTask}
    create(task_being_created)
    setNewTask({
      text: ""
    })
  }

  useEffect(() => {
    findAllTasks()
  }, [newTask])

  console.log(taskList)

  return (
    <div className="allform">
      <div>
      <FormControl
        id="searchTask"
        label="Search by ID"
        type="text"
        onChange={handleChange}
        name="task_id"
        value={task.task_id}
      />
      <button type="button" className={`btn`} onClick={handleClick}>Search</button>
        <FormControl 
        id="criar_descrição"
        label="Add a new task"
        onChange={handleChangeCreate}
        type="text"
        name="text"
        value={newTask.text} 
        />
      <button className="btn" onClick={handleCreateTask}>Add</button>  
        {/* <TaskForm
        onChange={handleChangeCreate}
        text_value={newTask.text}
        onClick={handleCreateTask}
        button_label={"Add"}
        /> */}
        </div> 

      {taskList.map((task, index) => (
          <div key={index} className="todo-container">
            <p className="todo">{task.text}</p>
          </div>
        ))}
    </div>
  );
}

export default Todo;