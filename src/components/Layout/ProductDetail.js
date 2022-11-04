import { capitalizeFirstLetter } from "../../utils/utils";
const ProductDetail = (props) => {
    const keys = [];
    for (const key in props.product[0]) {
        keys.push(key)
    }
    return <div>
        {keys.map((item, i) => {
            return <li key={item}>{capitalizeFirstLetter(item)}: {props.product[0][item]}</li>
        })}
    </div>
}

export default ProductDetail