import { useEffect, useState } from "react";
import "./Todo.css";
import FormControl from "./Forms/FormControl";
// import TaskForm from "./Forms/TaskForm";  Exemplo desabilitado
import CheckBoxControl from "./Forms/CheckBoxControl";
import { TaskService } from "../services/TaskService";
import Modal from "./Modal/Modal";

function Todo() {
  const [taskList, setTaskList] = useState([]);

  const [task, setTask] = useState({
    task_id: ""
  });

  const [newTask, setNewTask] = useState({
    text: ""
  });
  
  const [editedTask, setEditedTask] = useState({
    text:"",
    id:"",
    done: false
  });

  // flag para exibir os ternários
  const [todoEditing, setTodoEditing] = useState(false); 

  // flag para o modal de deletar 
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // flag para o para exibir o formulário do search by id
  const [showSearch, setShowSearch] = useState(false);

  // const baseURL= "http://localhost:8000/alltodo";       //foi substituido pelo TaskService e Api Helper

  async function findAllTasks() {
    // const response = await fetch(baseURL);          //foi substituido pelo TaskService e Api Helper
    // const tasks = await response.json();
    const tasks = await TaskService.getList();
    setTaskList(tasks);
  };

  async function findOneTask(id){
    // const response = await fetch(`${baseURL}/${id}`)              //foi substituido pelo TaskService e Api Helper
    // const task = await response.json()
    const task = await TaskService.getById(id);
    setTaskList([task]);
  };
  
  async function create(task){
    // const response = await fetch(baseURL, {            //foi substituido pelo TaskService e Api Helper
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
  };

  async function updateTask(id, editedTask) {
    //   const response = await fetch(`${baseURL}/${id}`, { // id para editar a task específica 
    //   method: 'put',                                     // mandar o objeto de configuração para ser atualizado
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },                                                  //foi substituido pelo TaskService e Api Helper
    //     mode: 'cors',
    //     body: JSON.stringify(editedTask),
    // })
    // const response_att_task = await response.json();
    const response_att_task = await TaskService.updateById(id, editedTask);
    setEditedTask({...response_att_task});  // att o state
    setTodoEditing(null);
  };

  async function deleteTask(id){
    // const response = await fetch(`${baseURL}/${id}`, {                      //foi substituido pelo TaskService e Api Helper
    //     method:'delete',
    //     headers: {
    //     'Content-Type': 'application/json',
    //     },
    //     mode: 'cors'
    // })
    // const response_task_deletada = await response.json()
    const response_task_deletada = await TaskService.deleteById(id);
    setEditedTask({...response_task_deletada}); // att o state
  };

  const handleChangeSearch = (event) => {
    setTask({...task, [event.target.name]: event.target.value});
  };

  const handleClickSearch = () => {
    const task_id_search = task.task_id;
    findOneTask(task_id_search);
  };

  const handleClickSearchForm = () => {   
    setShowSearch(true);  // para aparecer o formulário com o imput
  }
  const handleClickReturn = () => {      
    findAllTasks(); // para aparecer todas as tasks
    setShowSearch(false)
  };

  const handleChangeCreate = (event) => {
    setNewTask({...newTask, [event.target.name]: event.target.value});
  };

  const handleCreateTask = () => {
    const task_being_created = {...newTask};
    create(task_being_created);
    setNewTask({
      text: ""
    });
  };

  const closeModalDelete = () => {
    setShowDeleteModal(false);
  };

  const handleClickDeleteWarning = (e) => {  //modal de aviso para deletar
    setShowDeleteModal(true);
    setTask({task_id: e.target.id});
  };

  const handleClickDelete = () => {
    deleteTask(task.task_id);
    window.location.reload(true); // dá um refresh na página
  };

  const handleChangeEdit = (event) => {
    setEditedTask({...editedTask, [event.target.name]: event.target.value});
  };
  
  const handleUpdateTask = () => {
    const task_being_edited = {...editedTask};
    const id = task_being_edited.id;

    delete task_being_edited.id;
    updateTask(id, task_being_edited);
  };

  const handleClickEdit = async (event) => {
    setTodoEditing(true, {id: event.target.id});
    setEditedTask ({ ...editedTask, id: event.target.id});
    const task = await TaskService.getById(event.target.id);
    setEditedTask ({ ...editedTask, ...task});
  };
 
  const handleChangeCheckBox = async (event) => {
    const checkbox_value = event.target.checked;
    const task_to_be_updated = await TaskService.getById(event.target.id);
    const task_updated = {...task_to_be_updated, done: checkbox_value};
    await TaskService.updateById(event.target.id, task_updated);
    findAllTasks();
  };

  useEffect(() => {
    findAllTasks();
  }, [newTask, editedTask]);

  return (
    <div className="allform">
      <FormControl 
      id="criar_descrição"
      label="Add a new task"
      className="FormSeachAndCreate"
      onChange={handleChangeCreate}
      type="text"
      name="text"
      value={newTask.text} 
      />
      <button className="btn" onClick={handleCreateTask}>Add</button>  
      {/* exemplo inativo
        <TaskForm
        onChange={handleChangeCreate}
        text_value={newTask.text}
        onClick={handleCreateTask}
        button_label={"Add"}
        /> */}
      {showSearch ?
       <div>
          <FormControl
          id="searchTask"
          label="Search by ID"
          className="FormSeachAndCreate"
          type="text"
          onChange={handleChangeSearch}
          name="task_id"
          value={task.task_id}
          />
        <button type="button" className={`btn`} onClick={handleClickSearch}>Search</button>
        <button type="button" className={`btn`} onClick={handleClickReturn}>Return</button> </div>
        : <button type="button" className={`btnSearch`} onClick={handleClickSearchForm}>Search by ID</button>
      }

      {showDeleteModal ? (
        <Modal closeModal={closeModalDelete}>
          Are you sure you want to delete this task?
          <button id={task.id} type="buttonDel" className={`btn`} onClick={handleClickDelete}>
            Delet
          </button>
        </Modal> )
        : null
      }

      {taskList.map((task, index) => (
        <div key={index} className="todo-container">

          {todoEditing === true && editedTask.id === task.id
            // input edit text area
            ? <FormControl 
              id={task.id}
              key={task.id}
              className="FormEditTask"
              onChange={handleChangeEdit}
              type="text"
              name="text"
              value={editedTask.text} 
              />
            : <CheckBoxControl
              id={task.id}
              label={task.text}
              onChange={handleChangeCheckBox}
              name="done"
              checked={task.done}
              />} 

          {todoEditing === true && editedTask.id === task.id
            ? (<button className="btn_editText" onClick={handleUpdateTask}>Edit</button>)   
          
            : (<div className="todo_edits">
              {/* icone edit */}
              <svg id={task.id}
              onClick={handleClickEdit} 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              fill="currentColor" 
              className="iconEd" 
              viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg> 
              {/* icone delet */}
              <svg  id={task.id} 
              onClick={handleClickDeleteWarning} 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              fill="currentColor" 
              className="iconTr" 
              viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg> 
          </div>)}  
        </div>
      ))}
    </div>
  )
}

export default Todo;