import "./Overlay.css"
//Overlay do modal
const Overlay = (props) => {
    return(
        <div className="overlay"  onClick={props.overlayClick}>
             {props.children}       {/*o conteudo entre as divs é um props.children */}
        </div>
    )
}

export default Overlay