import FormControl from "./FormControl"

function TaskForm(props){
    return (
        <div className="form">
                <FormControl
                    id="criar_descrição"
                    label="New task"
                    type="text"
                    onChange={props.onChange}
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