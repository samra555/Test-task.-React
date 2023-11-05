import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { getProduct } from '../../services/api';
import { getSizes } from '../../services/api';

export default function ProductDetails() {
    const { id1,id } = useParams();
    const [itemSizes, setSizes] = useState(null)
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const sizes = await getSizes();
                setSizes(sizes);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getProduct(+id1);
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id1,id]);



    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

const products = product.colors[id-1];

    const { name, description,sizes, images } = products;

    const newSizes = itemSizes
        .filter((size) => sizes.includes(size.id))
        .map((size) =>  [size.label, "  ", size.number]);


    return (
        <div>
            <h1>Детальная страница товара</h1>
            <h2>{description}</h2>
            <h3>Выберите цвет:</h3>
            <div>

                {product.colors.map((color) => (

                    <Link to={`/products/${ product.id}/${ color.id}`} key={color.id}>
                        <button
                            style={{ backgroundColor: color.name }}
                        >
                            {color.name}
                        </button>
                    </Link>

                ))}
            </div>

            <h3>Выберите размер:</h3>
            <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)}>
                <option value="">Выберите размер</option>
                {newSizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>

            <h3>Изображения:</h3>
            <div>
                <button onClick={handlePreviousImage} disabled={currentImageIndex === 0}>
                    Предыдущее изображение
                </button>
                <img src={images[currentImageIndex]} alt={name} />
                <button onClick={handleNextImage} disabled={currentImageIndex === images.length - 1}>
                    Следующее изображение
                </button>
            </div>
        </div>
    );
}