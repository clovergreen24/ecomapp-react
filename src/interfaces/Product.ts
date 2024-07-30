

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    active: boolean;
    category_id: number;
    image_url: string | undefined;
    }