import "../../styles/Header.css";
import logo from '../../assets/img/logo.png'
import HeaderCartBtn from "./HeaderCartBtn";

const Header = (props) => {
    const HEADER_BTN_TITLE = "Your Cart";

    return (<nav className="feapi-nav__container">
        <header className="feapi-header">
            {/* TODO route to init */}
            <figure>
                <img src={logo} alt="logo" />
                <h1>Front Api Test</h1>
            </figure>
            <HeaderCartBtn text={HEADER_BTN_TITLE} number="6" onClick={props.onShowCart} />
        </header>
    </nav>)
}

export default Header;