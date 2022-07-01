import { useState } from "react";
// import { useEffect } from "react";
import { GetAllTodos } from "./mocks/Todomock"

function Todo(){
const [task, setTask] = useState([...GetAllTodos]);
const [newTask, setNewTask] = useState(""); 

// const handleShowTodo = (event) => {
//   const clone = [...GetAllTodos]
//   const aux = clone.splice(5,5)
//   console.log(clone)
//   console.log(aux)

//   // setListas(clone.splice(5,5))
//   setTask(clone)
// }

const addNewTodo = (e) => {
    e.preventDefault()  // previne que a página atualize e não guarde os dados
    let newTodo = {
      id: new Date().getTime(),
      text: newTask,
      completed: false,
    }
    //colocando a nova tarefa dentro do array
    const adding = [...task]
    adding.push(newTodo)
    setTask(adding)
    setNewTask("")  //"limpando" o imput
  }

  const handleSubmit = (e) => {
    console.log(e.target.value)
    e.preventDefault()
    setNewTask(e.target.value)
  }

  // // useEffect é um hook que lida com os efeitos colaterais 
  // // ele lida com os ciclos de vida do componente
  // // 2 argumentos: 1. função callback (efeito) 2. array de dependências

  // useEffect(()=>{
  // //     //1. capturar o valor atual do meu contador
  //     console.log("Valor atual do contador:", task)
  // //     // 2. atualizar minha lista com os valores do contador (adicionar)
  //     const newArr = [...task]
  //     newArr.push(task)
  // //     // 3. fazer o state "list" ser igual à essa nova lista
  //     setNewTask(newArr)
  // }, [task]); 


  function deleteTask(id){
    const delTodo = [...task].filter((tasks) => tasks.id !== id)  //boolean => "tasks" é referent a cada tarefa, se for false, não retorna o valor
    setTask(delTodo);
  }

  function taskComplete(id){
    // const updateTodo = [...task].map((tasks) => 
    // )
  }

  console.log("task:", task);
  console.log("mock: ", GetAllTodos);

  return (
    <div>
      <h1>Todo List </h1> 
      <form className="form" onSubmit={handleSubmit}>
          <input onChange={(e) => setNewTask(e.target.value)} type="text" value={newTask} placeholder="Add Todo"/>
          <button onClick={addNewTodo} type="submit">Submit</button>
      </form>
                                      
    <section>
      {task.map((states) => {
      return (
        <div key={states.id} className="todo">
        <div>{states.text}</div>
        <button onClick={() => deleteTask(states.id)}>Delete</button>
        <input type="checkbox" onClick={() => taskComplete(states.id)} />
        </div>
      );
    })}
    </section> 
    </div>
  ); 

};

export default Todo;

