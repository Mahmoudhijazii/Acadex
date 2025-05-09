import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="w-full h-48 overflow-hidden bg-gray-100 flex justify-center items-center">
                {image ? (
                    <img
                        className="h-full object-contain hover:scale-110 transition-transform ease-in-out duration-300"
                        src={image}
                        alt={name || 'Product image'}
                        onError={(e) => {
                            console.log("Image failed to load:", image);
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/200x200?text=No+Image';
                        }}
                    />
                ) : (
                    <div className="text-gray-400 text-center p-4">No image available</div>
                )}
            </div>
            <p className="pt-3 pb-1 text-sm truncate">{name || 'Product Name'}</p>
            <p className="text-sm font-medium">{currency}{typeof price === 'number' ? price.toFixed(2) : '0.00'}</p>
        </Link>
    );
};

export default ProductItem;