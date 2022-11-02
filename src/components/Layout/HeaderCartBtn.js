import "../../styles/HeaderCartBtn.css";

const HeaderCartBtn = (props) => {
    return (<button className="feapi-cart__button">
        <span className="feapi-cart__icon">
            <i className="bi bi-cart"></i>
        </span>
        <span>{props.text}</span>
        <span className="feapi-cart__badge">{props.number}</span>
    </button>)
}

export default HeaderCartBtn;