import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../interfaces/Category'; 
import { Link } from 'react-router-dom';

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Specify the type of the 'products' state as an array of 'Product'.
  

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  return (
    <div className="container mx-20 px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map(category => (
        <div key={category.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={category.image_url}
            alt={category.name}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <Link to={`/products/${category.id}`} className="text-xl font-bold mb-2 text-pink-800">{category.name}</Link>
          
            <p className="text-pink-700 mb-4">{category.description}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default CategoriesList;
