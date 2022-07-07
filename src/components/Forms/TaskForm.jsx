import FormControl from "./FormControl"

// Exemplo desabilidato do formulário "add a new task". Ex de uma forma separada do FormControl já com o botão 
// e inserido no "todo.jsx" com os valores (variáveis) que precisam ser diferentes do FormControl

function TaskForm(props){
    return (
        <div className="form">
                <FormControl
                    id="criar_descrição"
                    label="New task"
                    type="text"
                    onChange={props.onChange} // depois do ponto poderia ser qualquer nome, porem tem que ser semantico e igual aonde vai ser usado "todo.jsx"
                    name="text"
                    value={props.text_value}
                />
                <button type="button" 
                className={`btn`}
                onClick={props.onClick}>
                    {props.button_label}
                </button>
        </div>
    )
}
export default TaskForm