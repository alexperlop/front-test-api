import { Link } from 'react-router-dom'
import '../../styles/Product.css'

const Product = (props) => {
    const price = `${props.price}€`
    return (
        <li className="feapi-item" key={props.id}>
            <Link to={`/products/${props.id}`}>
                <figure>
                    <img src={props.imgUrl} alt={props.name} />
                </figure>
                <h3>{props.name}</h3>
                <p>{props.brand}</p>
                <p>{price ? price : '€'}</p>
            </Link>
        </li >)
}

export default Product