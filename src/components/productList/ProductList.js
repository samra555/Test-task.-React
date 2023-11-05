import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/api';
import "../productList/productList.css"


export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
         const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
         };
         fetchData();

     }, []);

    return (

        <div >
            <h1>Список товаров</h1>
            <div className="list-of-items">
            {products.map((product) =>
                product.colors.map((item) => (
                    <div className="item" key={item.id}>
                        <Link to={`/products/ ${ product.id} /${ item.id}`}>
                            <img src={item.images[1]} alt={product.name} />
                            <p>{product.name}</p>
                        </Link>
                    </div>
                ))
            )}
        </div>
        </div>
    );
}