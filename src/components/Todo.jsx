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
  
  const [editedTask, setEditedTask] = useState({
    text:"",
    id:""
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
  
  async function create(task){
    const response = await fetch(baseURL, {
      method: 'post',                              // linha 31 a 36 é o objeto de configuração
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(task)
    })
    const newTask = await response.json()
    setNewTask([newTask])
  }

  async function updateTask(id, editedTask) {
    const response = await fetch(`${baseURL}/${id}`, { // id para editar a task específica 
    method: 'put',                                     // mandar o objeto de configuração para ser atualizado
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(editedTask),
  })
  const response_att_task = await response.json()
  setEditedTask({...response_att_task})
}

async function deleteTask(id){
  const response = await fetch(`${baseURL}/${id}`, {
      method:'delete',
      headers: {
      'Content-Type': 'application/json',
      },
      mode: 'cors'
  })
  const response_task_deletada = await response.json()
  setEditedTask({...response_task_deletada})
  console.log(response_task_deletada)
}

  // useEffect(() => {
  //   findAllTasks()
  // }, [])

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

  const handleChangeEdit = (event) => {
    setEditedTask({...editedTask, [event.target.text]: event.target.value})
}

 //on click do form
  const handleUpdateTask = () => {
    const task_being_edited = {...editedTask}
    const id = task_being_edited.id

    delete task_being_edited.id
    updateTask(id, task_being_edited)
  }

  // botão editar
  const handleClickEdit = (event) => {
    setEditedTask({...editedTask, id: event.target.id})
    findOneTask(event.target.id)
  }

  const handleClickDelete = (e) => {
    deleteTask(e.target.id)
  
}

  useEffect(() => {
    findAllTasks()
  }, [newTask, editedTask])

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
        <FormControl 
        onChange={handleChangeEdit}
        type="text"
        name="text"
        value={editedTask.text} 
        />
        <button onClick={handleUpdateTask}>Edit</button>
        </div> 

      {taskList.map((task, index) => (
          <div key={index} className="todo-container">
            <p className="todo">{task.text} <button onClick={handleClickEdit}>Edit</button> <button onClick={handleClickDelete}>Delet</button></p>
          </div>
        ))}
    </div>
  );
}

export default Todo;