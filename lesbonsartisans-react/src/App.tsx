import React, {useState, useEffect} from 'react';
import Product from './models/product';
import { PRODUCTS } from './models/data-products'
import AppBar from './nav/Nav';
import ProductsTable from './displayProducts/ProductsTab';


export default function App(){
    const [products, setProducts] = useState<Product[]>([])

    useEffect(()=>{
        setProducts(PRODUCTS)
    }, [])
  
    return (
        <>
            <AppBar/>
            <ProductsTable/>
        </>
    )
}
  
