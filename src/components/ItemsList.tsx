import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types'; 
const ItemsList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Specify the type of the 'products' state as an array of 'Product'.

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ItemsList;
