import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {saveToLocal, loadFromLocal} from '../Library/localStorage';

function NewProductCard ({listOfAllProducts}) {

    const localStorageFavouriteProducts = loadFromLocal('_favouriteProducts');
    const [favouriteProducts, setFavouriteProducts] = useState (localStorageFavouriteProducts ?? []);

    useEffect(() => {
        saveToLocal('_favouriteProducts', favouriteProducts);
      }, [favouriteProducts]);

        function addToFavourites (favouriteProductToAdd) {
            // bei KLICK auf das STERN-ICON startet diese function:
            if (favouriteProducts.some(
                (everyFavouriteProduct) =>
                everyFavouriteProduct.id === favouriteProductToAdd.id
                // Bsp. Glühwein (ID=1), Lebkuchen (ID=2) ist in favouriteProducts-Array, dann Klick auf Kekse (ID=3) ->
                // function geht favouriteProducts-Array durch (Glühwein (ID=1), Lebkuchen (ID=2) enthalten) & checkt ob Kekse ID(=3)
                // in dem favouriteProducts-Array drin ist durch ===; ist in diesem fall FALSE (Kekse ID=3) NOCH NICHT ENTHALTEN)!
                // weiter bei "else"
                // WENN Kekse ID=3 bereits enthalten ist, ist es TRUE, 
              )
              ) {
              const updatedFavouriteProducts = favouriteProducts.filter(
                (everyFavouriteProduct) =>
                everyFavouriteProduct.id !== favouriteProductToAdd.id
                // wenn if-Abfrage TRUE ist:
                // (Bsp. Glühwein (ID=1), Lebkuchen (ID=2), Kekse (ID=3)) sind im favouriteProducts-Array)
                // dann klick auf aktiviertes Stern-ICON bei Glühwein (ID=1) -> favouriteProducts-Array wird gefiltert
                // jede ID der favouriteProducts (Glühwein, Lebkuchen, Kekse) wird verglichen mit ID des geklickten Products (Glühwein ID=1)
                // alle IDs die NICHT der ID des geklickten Products entsprechen, verbleiben im favouriteCharacters-Array!
                // d.h. nur Product der geklickten ID fliegt wieder raus
                // Glühwein ID=1 (everyFavouriteProduct.id) !== Glühwein ID=1 (favouriteProductToAdd.id) PRÜFUNG IST FALSE, WIRD RAUSGEFILTERT!!
              );
              setFavouriteProducts(updatedFavouriteProducts);
              
        } else {
          // wenn FALSE -> ...favouriteProducts(=Lebkuchen, Kekse) + favouriteProductToAdd(=Glühwein)
          // Product (GLÜHWEIN) ist noch NICHT auf der Liste der Favourites => Hinzufügen!
          setFavouriteProducts([...favouriteProducts, favouriteProductToAdd]);
        }
      }

return (
    <NewProductContainer>
      {
        listOfAllProducts.map((product, index) => 
        <NewProduct key={index}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}€</p>
          <p>Category: {product.category}</p>
          <p>Tag: {product.tags?.sort().join(', ')}</p> 
          {/* Fragezeichen hinter tags hinzugefügt, damit nur sortiert wird, wenn tags da sind!*/} 
          <FavouritesIcon onClick={() => addToFavourites(product)}>
              {favouriteProducts.some((favourite) => favourite.id === product.id) 
            ? '⭐️' 
            : '✩'}
          </FavouritesIcon>
          </NewProduct>  
          )
      }
    </NewProductContainer>
);
}

export default NewProductCard;

const NewProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NewProduct = styled.article`
  background: #BB2528;
  border: 2px solid #165B33;
  color: white;
  font-size: 0.9rem;
  padding: 0.5rem;
  margin: 0.5rem;
  position: relative;
`;

const FavouritesIcon = styled.span`
  font-size: 1.5rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.2rem;
  cursor: pointer;
`;