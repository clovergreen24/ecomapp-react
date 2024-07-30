

import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Category } from "../interfaces/Category";

function CategoryPage() {
    const {category_id} = useParams();
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/categories/'+ (category_id ? category_id.toString() : ''))
        .then(response => setCategory(response.data))
        .catch(error => console.error('Error fetching data:', error));
      },[]);

    return (
        <>
        <div className="mx-20 px-4">
        <h1 className="text-pink-800 bg-pink-200">{category?.name}</h1>
        </div>
        <ProductsList />
        </>
    );
}

export default CategoryPage;