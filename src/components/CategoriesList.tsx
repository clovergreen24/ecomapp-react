import { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../interfaces/Category'; 
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../config';

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Specify the type of the 'products' state as an array of 'Product'.

  useEffect(() => {
    axios.get(ENDPOINTS.CATEGORIES)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  

  return (
    <div className="container mx-20 px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map(category => (
        
        <Link to={`/${category.id}/products`} className="text-xl font-bold mb-2 text-pink-800">
        <div key={category.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={category.image_url}
            alt={category.name}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
          {category.name}
          
            <p className="text-pink-700 mb-4">{category.description}</p>
        </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default CategoriesList;
