

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


export const ENDPOINTS = {
    CATEGORIES: `${API_BASE_URL}/categories`,
    PRODUCTS_BY_CATEGORY: (category_id: string) => `${API_BASE_URL}/products/by_category/${category_id}`,
    CATEGORY: (category_id: string) => `${API_BASE_URL}/categories/${category_id}`,
    PRODUCT: (product_id: string) => `${API_BASE_URL}/products/${product_id}`,
    PRODUCT_STOCKS: (product_id: string) => `${API_BASE_URL}/stocks/${product_id}`,
    AVAILABLE_STOCK: (stocklist: string) => `${API_BASE_URL}/stocks/available_stock/${stocklist}`,
    PLACE_ORDER: `${API_BASE_URL}/orders`,
};