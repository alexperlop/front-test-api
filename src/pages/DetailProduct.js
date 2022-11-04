import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import ProductDetail from '../components/Layout/ProductDetail'
import AddProducts from '../components/Products/AddProducts'
import CartContext from '../store/cart-context'
import '../styles/DetailProduct.css'

const DetailProduct = (props) => {
    const cartCtx = useContext(CartContext);
    const params = useParams()
    const [options, setOptions] = useState()
    const [img, setImg] = useState()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()
    const addToCartHandler = (amount, colorChosen, internalMemory) => {
        cartCtx.addItem({
            id: params.productId,
            name: products[0].model,
            amount: amount,
            price: products[0].price,
            color: colorChosen,
            internalMemory: internalMemory,
            option: options
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://front-test-api.herokuapp.com/api/product/${params.productId}`);
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const responseData = await response.json();
            const loadedProduct = []

            loadedProduct.push({
                brand: responseData.brand,
                model: responseData.model,
                price: responseData.price,
                cpu: responseData.cpu,
                ram: responseData.ram,
                os: responseData.os,
                displayResolution: responseData.displayResolution,
                battery: responseData.battery,
                dimentions: responseData.dimentions,
                weight: responseData.weight,

            })
            setOptions(responseData.options)
            setImg(responseData.imgUrl)
            setProducts(loadedProduct)
            setIsLoading(false)
        }
        fetchData().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [params.productId])

    if (isLoading) {
        return <div className="feapi-center">
            <h1>Loading</h1>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    }

    if (httpError) {
        return <div className="feapi-center">
            <h1>{httpError}</h1>
        </div>
    }

    const { model } = products[0]
    return <div className='feapi-detail__img row'>
        <figure>
            <img src={img} alt={model} />
        </figure>
        <div className='feapi-detail__info'>
            <h1>Description</h1>
            <ul>
                <ProductDetail product={products} />
            </ul>
            <AddProducts option={options} onAddToCart={addToCartHandler} />
        </div>
    </div >
}

export default DetailProduct;