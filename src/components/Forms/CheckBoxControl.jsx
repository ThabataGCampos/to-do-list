function CheckBoxControl(props){
    return(
        <div className="form_checkbox">
            <input type="checkbox" 
                id={props.id}
                className="form_checkbox_input"
                onChange={props.onChange}
                name={props.name}
                checked={props.checked}
            />
            <label className="form_checkbox_label" htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    );
};

export default CheckBoxControl;