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

const addNewTodo = (event) => {
  let new_todo = {
    // id: "",
    text: newTask,
    // completed: false,
  }

  const clone2 = [...task]
  clone2.push(new_todo)
  setTask(clone2)
  setNewTask("")
}

const handleSubmit = (event) => {
  console.log(event.target.value)
  event.preventDefault()
  setNewTask(event.target.value)
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


console.log("task:", task);
console.log("mock: ", GetAllTodos);


// function handleSubmit(event) {
//     event.preventDefault()
// }

return (
  <div>
    <h1>Todo List </h1> 
    <form className="form">
        <label>Add Todo</label>
        <input onChange={handleSubmit} type="text" value={newTask} />
        <button onClick={addNewTodo} type="submit">Submit</button>
    </form>

  <section>
    {task.map((states) => {
    return (
      <div>
        text={states.text}
      </div>
    );
  })}
</section> 
</div>
); 

};

export default Todo;

