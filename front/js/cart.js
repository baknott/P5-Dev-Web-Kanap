const urlApi = 'http://localhost:3000/api/products';
// URL de l'api

fetch(urlApi)  //Recupère l'url de l'api
.then((resp) => resp.json()     // vérifie la promesse/reponse
.then((data) => {   
    
    const parser = new DOMParser();
    const cart__items = document.getElementById('cart__items');
    let existingCart = JSON.parse(localStorage.getItem("productsInCart"));
    let allItems = [data]; 
    console.log(allItems);
    //Boucle For, pour chaque élément de l'API présent dans le localStorage, on doit créer un nouveau bloc     
    for (i = 0; i < data.length; i ++) { 
        existingCart.forEach(oneProductInCart =>{
            if(oneProductInCart.id === data[i]._id){
                let cartProducts = 
                    `<article class="cart__item" data-id="${data[i]._id}" data-color="${oneProductInCart.color}">
                        <div class="cart__item__img">
                            <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${data[i].name}</h2>
                                <p>${oneProductInCart.color}</p>
                                <p>${data[i].price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : ${oneProductInCart.quantity}</p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${oneProductInCart.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" onclick="deleteFunction('${oneProductInCart.id}','${oneProductInCart.color}')">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
                    
                    //On transforme l'élément allProducts(string) en document HTML
                    const showAllProducts = parser.parseFromString(cartProducts, "text/html");
                    //On affiche les différents éléments
                    cart__items.appendChild(showAllProducts.body.firstChild);
                    deleteFunction = (idProduitCible, colorProduitCible) =>{
                        for (i = 0; i < existingCart.length; i ++) { 
                            if((idProduitCible === existingCart[i].id) && (colorProduitCible === existingCart[i].color)){
                                existingCart.splice(i, 1);
                                localStorage.setItem("productsInCart", JSON.stringify(existingCart));
                                location.reload();
                            }
                        }   
                    
                    };
            }
        });
    };
    

}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});

