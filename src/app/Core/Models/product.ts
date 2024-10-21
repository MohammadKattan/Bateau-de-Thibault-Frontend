export interface Product{
    tig_id: number;
    id: number;
    name: string;
    category: number;
    price: number;
    price_on_sale: number;
    unit: string;
    availability: boolean;
    sale: boolean;
    discount: number;
    comments: string;
    owner: string;
    quantityInStock: number;
    isEditing: boolean;
    operationType: 'add' | 'remove'; 
    stockChange: number;
    operationPrice: number;
    // quantity_sold:number;
}