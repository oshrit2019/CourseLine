import React, { createContext, useState } from "react";
import { dummyProducts } from "../services/dummy";
import $ from "jquery";

export const ProductsContext = createContext();




const ProductsContextProvider = ({ children }) => {
  //const [products] = useState(dummyProducts);
  const userName = sessionStorage.getItem("userEmail");
  const [products, productsSet] = React.useState([]);

  React.useEffect(() => {
    async function fetchProducts() {
      let jsonData = {
        "email": userName
      }
      let productsHelp = [];
      $.ajax({
        type: "POST",
        url: "/getCatalog",
        data: jsonData
      }).done(function (res) {
        console.log("done done!! " + res.array);
        if (res == "error") {
          console.log("error");

        }
        else {
          let respone = JSON.parse(res);
          console.log("array is " + respone.array[0]._id);
          for (let i = 0; i < respone.array.length; i++) {
            let x = {
              id: respone.array[i]._id,
              name: respone.array[i].name,
              price: respone.array[i].price,
              photo: respone.array[i].src,
              rating: Math.floor(Math.random() * 6),
              moreDetails: respone.array[i].description,
              saved: respone.array[i].saved
            };
            productsHelp.push(x);
          }
          productsSet(productsHelp);

          //productsHelp = respone.array;

        }

      })
        .fail(function (jqXhr) {
          alert("fail");

        });

      /* let fullResponse = await fetch('/getCatalog',
         {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ "user": { "email": userName } })
         });
    
 
 
 
       // const SavedItemsOfUser = await fetch('/getSavedItems', { method: 'POST', body: { "userName": userName } });
       let responseJson = fullResponse.json();
       //let responseJson = JSON.parse(fullResponse);
       //const responseJson2 = await SavedItemsOfUser.json();
       //console.log(responseJson2);
       /* if (responseJson2 == []) {
          console.log("!!!!!!!!!!!!!!!!!!!!!!");
        }*/
      //console.log(fullResponse);
      //let saved = false;
      /* let productsHelp = [];
       console.log(responseJson.array);
       for (let i = 0; i < responseJson.array.length; i++) {
         let jsonItem = responseJson.array[i];
         console.log("item is " + jsonItem);
         //let jsonItem = JSON.parse(item);
         /*if (responseJson2.includes(item._id)) {
           saved = true;
         }
         let x = {
           id: jsonItem._id,
           name: jsonItem.name,
           price: jsonItem.price,
           photo: jsonItem.src,
           rating: Math.floor(Math.random() * 6),
           moreDetails: jsonItem.description,
           saved: jsonItem.saved
         };
         productsHelp.push(x);
       }*/
    }

    fetchProducts();
  }, []);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
