import { useEffect, useState } from "react";
import "./Todo.css";
import FormControl from "./Forms/FormControl";
// import TaskForm from "./Forms/TaskForm";  Exemplo desabilitado
import CheckBoxControl from "./Forms/CheckBoxControl";
import { TaskService } from "../services/TaskService"

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
    id:"",
    done: false
  });

  const baseURL= "http://localhost:8000/alltodo";

  async function findAllTasks() {
    // const response = await fetch(baseURL);
    // const tasks = await response.json();
    const tasks = await TaskService.getList();
    setTaskList(tasks);
  }

  async function findOneTask(id){
    // const response = await fetch(`${baseURL}/${id}`)
    // const task = await response.json()
    const task = await TaskService.getById(id);
    setTaskList([task])
  }
  
  async function create(task){
    // const response = await fetch(baseURL, {
    //   method: 'post',                              // linha 31 a 36 é o objeto de configuração
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   mode: 'cors',
    //   body: JSON.stringify(task)
    // })
    // const newTask = await response.json()
    const newTask = await TaskService.create(task);
    setNewTask([newTask]);
  }

  async function updateTask(id, editedTask) {
  //   const response = await fetch(`${baseURL}/${id}`, { // id para editar a task específica 
  //   method: 'put',                                     // mandar o objeto de configuração para ser atualizado
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     mode: 'cors',
  //     body: JSON.stringify(editedTask),
  // })
  // const response_att_task = await response.json();
  const response_att_task = await TaskService.updateById(id, editedTask);
  setEditedTask({...response_att_task});  // att o state
}

async function deleteTask(id){
  // const response = await fetch(`${baseURL}/${id}`, {
  //     method:'delete',
  //     headers: {
  //     'Content-Type': 'application/json',
  //     },
  //     mode: 'cors'
  // })
  // const response_task_deletada = await response.json()
  const response_task_deletada = await TaskService.deleteById(id);
  setEditedTask({...response_task_deletada}) // att o state
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
    setEditedTask({...editedTask, [event.target.name]: event.target.value});
};

 //on click do form
  const handleUpdateTask = () => {
    const task_being_edited = {...editedTask};
    const id = task_being_edited.id;

    delete task_being_edited.id;
    updateTask(id, task_being_edited);
  };


  async function findEditTask(id){
    const response = await fetch(`${baseURL}/${id}`)
    const task = await response.json()
    setEditedTask({...editedTask, ...task})
  }

  // botão editar
  const handleClickEdit = (event) => {
    setEditedTask({...editedTask, id: event.target.id})
    findEditTask(event.target.id)
  }

  const handleClickDelete = (e) => {
    deleteTask(e.target.id)
    window.location.reload(true)  // dá um refresh na página
}

const handleChangeCheckBox = (event) => {
  setEditedTask({...editedTask, done: event.target.checked});
  console.log(event.target.checked);
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
            id="alt_task"
            onChange={handleChangeEdit}
            type="text"
            name="text"
            value={editedTask.text} 
          />
        <button onClick={handleUpdateTask}>Edit</button>
          <CheckBoxControl
          id="done"
          onChange={handleChangeCheckBox}
          name="done"
          checked={editedTask.done}
          />
      </div> 

      {taskList.map((task, index) => (
          <div key={index} className="todo-container">
            <p className="todo">{task.text}</p>
            <CheckBoxControl
            id="done"
            onChange={handleChangeCheckBox}
            name="done"
            checked={task.done}
          />
            {/* <p>{task.done}</p> */}
            {/* {task.done 
                        ? <p className="card-text">done</p>
                        : <p className="card-text">To do</p>}  */}
            <button id={task.id} onClick={handleClickEdit}>Edit</button> 
            <button id={task.id} onClick={handleClickDelete}>Delet</button>
           
          </div>
        ))}
    </div>
  );
}

export default Todo;