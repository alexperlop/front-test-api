import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import HeaderCartBtn from "./HeaderCartBtn";
import "../../styles/Header.css";

const Header = (props) => {
    const HEADER_BTN_TITLE = "Your Cart";

    return (<nav className="feapi-nav__container">
        <header className="feapi-header">
            <Link to='/home'>
                <figure>
                    <img src={logo} alt="logo" />
                    <h1>Front Api Test</h1>
                </figure>
            </Link>
            <HeaderCartBtn text={HEADER_BTN_TITLE} number="6" onClick={props.onShowCart} />
        </header>
    </nav>)
}

export default Header;