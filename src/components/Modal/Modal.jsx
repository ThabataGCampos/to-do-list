import "./Modal.css"
import Overlay from "../Overlay/Overlay"


function Modal(props){

  const handleModalClick = (event, canClose) => {
    event.stopPropagation()     //stop propagation é para que o evento não se propague nos outros (onClicks)
    if(canClose) props.closeModal()   //Se canClose for true, close Modal
  }

    return (
        <Overlay overlayClick={props.closeModal}>
          <div className="Modal" overlayClick={handleModalClick}>
            <span className="Modal_close" onClick={(event) => handleModalClick(event, true)}>x</span>
            <div className="Modal_body">{props.children}</div>
          </div>
        </Overlay>
    )
}

export default Modal