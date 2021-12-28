import { useEffect, useState } from 'react'
import './App.css'
import styled from "styled-components";
import ProductForm from './components/ProductForm'
import NewProductCard from './components/NewProductCard';

import {saveToLocal, loadFromLocal} from './Library/localStorage';

function App() {
  
  const localStorageProducts = loadFromLocal('_products');
  
  const [products, setProducts] = useState(localStorageProducts ?? []); // wenn localStorage undefined, setze leeres Array ein
  
  useEffect(() => {
    saveToLocal('_products', products);
  }, [products]); // wenn leeres Array [], wird useEffect 1x zu Beginn zum laden der Seite ausgeführt (wäre zB in JavaScript so)
  // jedes mal, wenn "products" sich verändert, startet der useEffect mit saveToLocal

  const addProduct = (product) => setProducts([...products, product]);
  // diese function ist für "setProducts", damit wir setProducts in andere Komponenten
  // weitergeben können
 
  return (
    <Container> 
    <ProductForm onAddProduct={addProduct}/> 
    {/* ProductForm bekommt die Funktion "addProduct" als Eigenschaft, damit sie diese aufrufen kann*/}
    
    <NewProductCard listOfAllProducts={products} />

    </Container>
  );
}

export default App

const Container = styled.div`
  background-color:#F8B229;
  border: 6px solid #165B33;
  border-radius: 10px;
  color: #BB2528;
  max-width: 30rem;
  margin: 1rem auto;
  padding: 1rem;
`;

