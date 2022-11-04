import { NavLink, useLocation } from 'react-router-dom'
import '../../styles/BreadCrumb.css'

const BreadCrumb = (props) => {
    const location = useLocation();

    return (
        <div className='feapi-breadcrumb'>
            <NavLink activeClassName='active' className='feapi-breadcrumb__link' to="/home">
                Home
            </NavLink>
            {location.pathname.includes('/products') && <NavLink className='feapi-breadcrumb__link' activeClassName='active' to={location.pathname}>
                Products
            </NavLink>}
        </div>
    )
}
export default BreadCrumb