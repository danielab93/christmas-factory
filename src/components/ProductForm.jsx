import styled from "styled-components";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import Checkbox from "./Checkbox";
import Select from "./Select";
import RadioButton from "./RadioButton";
import ProductTags from "./ProductTags";
import isProductValid from "../Library/validation";

function ProductForm({ onAddProduct }) {
  const initialProduct = {
    name: "",
    price: 0,
    isVegan: false,
    packageSize: "",
    category: "",
    tags: [],
    contactEmail: "",
  };
  // Neuer State für categories
  const [categories, setCategories] = useState([]);

  // asynchrone Funktion um Kategorien zu laden
  const fetchCategories = async () => {
    const response = await fetch("http://localhost:4004/categories");
    const data = await response.json();
    // state erfüllen, wenn Kategorien geladen sind
    setCategories(data);
  };

  // Nur 1x (Initial) die Kategorien fetchen
  useEffect(() => fetchCategories(), []); // [] = useEffect wird initial gezündet, soll nur beim ersten Rendern ausgeführt werden, NUR 1x!

  /* const categories = [
    'Tee', 
    'Wein & Likör',
    'Lebkuchen', 
    'Kekse', 
    'Adventskalender', 
    'Dekoration'
  ]; */

  const [product, setProduct] = useState(initialProduct);
  const [hasFormErrors, setHasFormErrors] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isProductValid(product)) {
      onAddProduct({ id: uuidv4(), ...product });
      setProduct(initialProduct);
      setHasFormErrors(false);
    } else {
      setHasFormErrors(true);
    }
  };

  function updateTags(tag) {
    const updatedTags = [...product.tags, tag];
    setProduct({ ...product, tags: updatedTags });
  }

  function deleteTag(clickedTag) {
    const remainingTags = product.tags.filter((everyTag) => {
      return everyTag !== clickedTag;
      // remainingTags ist jeder Tag, der ungleich dem geklickten Tag ist
      // geklickte fliegen raus, nicht geklickte bleiben drin!
    });
    setProduct({ ...product, tags: remainingTags });
  }

  const handleInputChange = (name, value) => {
    // fügt dem Produkt die neuen Informationen hinzu, z.B. Name, Preis
    setProduct({
      // alle bestehenden Properties behalten
      ...product,
      // behalte bereits angegebene Daten im Formular, auch wenn ich neue Mailadresse eintippe
      // neu zu setzende Property -> deren Wert überschreiben
      [name]: value, // "name" bezieht sich auf z.B. name="price" im NumberInput, value=5€
    });
  };

  return (
    <>
      <h1>🎄 ADD A NEW PRODUCT 🎄</h1>
      {hasFormErrors && (
        <ErrorMessage>
          <span>🎅🏼</span> HO HO HO! <br />
          PLEASE CHECK IF YOUR DATA IS CORRECT!
        </ErrorMessage>
      )}
      {/* hasFormErrors = Prüfung auf true/ false, nur wenn "hasFormErrors" true ist, wird ErrorMessage nach "&&"" ausgeführt */}
      <Form onSubmit={handleSubmit}>
        <TextInput
          name="name"
          value={product.name}
          onTextInputChange={handleInputChange}
        >
          Product Name
        </TextInput>

        <InputRow>
          <div>
            <NumberInput
              name="price"
              value={product.price}
              onNumberInputChange={handleInputChange}
            >
              Price (in €)
            </NumberInput>
          </div>

          <Checkbox
            name="isVegan"
            value={product.isVegan}
            onCheckboxChange={handleInputChange}
          >
            Vegan
          </Checkbox>
        </InputRow>

        <SizeContainer>
          <RadioButton
            value={product.packageSize}
            onRadioChange={handleInputChange}
          >
            Package Size
          </RadioButton>
        </SizeContainer>

        <CategoryContainer>
          <Select
            name="category"
            value={product.category}
            options={categories}
            onSelectChange={handleInputChange}
          >
            Product Category
          </Select>
        </CategoryContainer>

        <h3>Product Tags</h3>
        <ProductTags
          label=""
          tags={product.tags}
          onUpdateTags={updateTags}
          onDeleteTag={deleteTag}
        />

        <TextInput
          name="contactEmail"
          value={product.contactEmail}
          onTextInputChange={handleInputChange}
        >
          Contact E-Mail
        </TextInput>

        <ButtonContainer>
          <button type="submit">Add Product</button>
          <button
            type="reset"
            onClick={() => {
              setProduct(initialProduct);
              setHasFormErrors(false);
            }}
          >
            Reset
          </button>
        </ButtonContainer>
      </Form>
    </>
  );
}

export default ProductForm;

const InputRow = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Form = styled.form`
  width: 70%;
  label {
    display: block;
    font-weight: bold;
  }
  input {
    padding: 0.25rem;
    margin-bottom: 0.5rem;
  }
`;

const SizeContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const CategoryContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  background: #bb2528;
  color: #f8b229;
  font-weight: bold;
  padding: 0.5rem;
  width: fit-content;
  span {
    font-size: 2rem;
    display: inline-block;
    transition: all 0.5s;
  }
  span:hover {
    transform: rotateZ(20deg);
  }
`;
