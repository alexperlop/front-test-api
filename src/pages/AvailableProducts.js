import { useEffect, useState } from "react";
import "../styles/AvailableProducts.css"
import Product from "../components/Products/Product";

const AvailableProducts = (props) => {
    const [searchInput, setSearchInput] = useState([])
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://front-test-api.herokuapp.com/api/product');
            if (!response.ok) {
                throw new Error('Somenthing went wrong!')
            }
            const responseData = await response.json();

            const loadedProduct = [];

            for (const key in responseData) {
                loadedProduct.push({
                    id: responseData[key].id,
                    brand: responseData[key].brand,
                    price: responseData[key].price,
                    model: responseData[key].model,
                    imgUrl: responseData[key].imgUrl
                })
            }
            setProducts(loadedProduct)
            setIsLoading(false)
        }

        fetchData().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])

    const searchProductHandler = (event) => {
        const filteredProduct = products.filter(product => product.model.toLowerCase().includes(event.target.value))
        if (filteredProduct) {
            setSearchInput(filteredProduct)
        } else {
            return
        }
    }

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

    const found = searchInput.map(product => {
        return <Product key={product.id}
            id={product.id}
            brand={product.brand}
            name={product.model}
            price={product.price}
            imgUrl={product.imgUrl} />
    })

    return (
        <section className="feapi-section">
            <input
                className="feapi-search__input"
                type="text"
                placeholder="Search here"
                onChange={searchProductHandler} />
            <ul className="feapi-list">
                {searchInput.length > 0 && found}
                {searchInput.length === 0 && products.map(product => {
                    return <Product key={product.id}
                        id={product.id}
                        brand={product.brand}
                        name={product.model}
                        price={product.price}
                        imgUrl={product.imgUrl} />
                })}
            </ul>
        </section>
    )
}

export default AvailableProducts;