import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types'; 
const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Specify the type of the 'products' state as an array of 'Product'.

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ul>
      {products.map(product => (
        <div className='padding-left'>
          <img src={product.image} />
        <li key={product.id}>{product.name}</li>
        </div>
      ))}
    </ul>
  );
};

export default ProductsList;
