import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import '../../styles/Modal.css'

const BackDrop = (props) => {
    return <div className='backdrop' onClick={props.onHideCart} />
}

const ModalOverlay = (props) => {
    return <div className='modal'>
        <div className='content'>{props.children}</div>
    </div>
}
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<BackDrop onHideCart={props.onHideCart} />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}
export default Modal