import { useState } from "react";
import { useEffect } from "react";
import { GetAllTodos } from "./mocks/Todomock"

function Todo(){
const [state, setState] = useState(GetAllTodos);
const [list, setList] = useState([]); 

// useEffect é um hook que lida com os efeitos colaterais 
// ele lida com os ciclos de vida do componente
// 2 argumentos: 1. função callback (efeito) 2. array de dependências
useEffect(()=>{
    //1. capturar o valor atual do meu contador
    console.log("Valor atual do contador:", state)
    // 2. atualizar minha lista com os valores do contador (adicionar)
    const newArr = [...list]
    newArr.push(state)
    // 3. fazer o state "list" ser igual à essa nova lista
    setList(newArr)
}, [state]) 


console.log("state:", state);
console.log("mock: ", GetAllTodos);



function handleSubmit(event) {
    event.preventDefault()

// const newTodo = {
//     id: 
//     text: state
//     completed: false
// }

}

return (
    <div>
        <h1>Todo List </h1> 
        <form onSubmit={handleSubmit} className="form">
            <label>Add Todo</label>
            <input type="text" />
            <button type="submit">Submit</button>
        </form>
    </div>
); 
};

export default Todo;

<section>
{state.map((states) => {
  return (
    <div>
      id={states.id}
      text={states.text}
      completed={states.completed}
    </div>
  );
})}
</section>
