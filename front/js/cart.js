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
                                <p id="${oneProductInCart.id}${oneProductInCart.color}price">${data[i].price} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : ${oneProductInCart.quantity}</p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="${oneProductInCart.id}${oneProductInCart.color}" onchange="updateQuantity('${oneProductInCart.id}','${oneProductInCart.color}')" value="${oneProductInCart.quantity}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem" onclick="deleteFunction('${oneProductInCart.id}','${oneProductInCart.color}','${oneProductInCart.quantity}')">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>`;
                    
                    //On transforme l'élément allProducts(string) en document HTML
                    const showAllProducts = parser.parseFromString(cartProducts, "text/html");
                    //On affiche les différents éléments
                    cart__items.appendChild(showAllProducts.body.firstChild);
                    deleteFunction = (idProduitCible, colorProduitCible,quantityProduitCible) =>{
                        for (i = 0; i < existingCart.length; i ++) { 
                            
                            if((idProduitCible === existingCart[i].id) && (colorProduitCible === existingCart[i].color)){
                                existingCart.splice(i, 1);
                                localStorage.setItem("productsInCart", JSON.stringify(existingCart));
                                if(quantityProduitCible == 1){
                                    alert("Votre article a été supprimé du panier !")
                                }else{
                                    alert("Vos articles ont été supprimés au panier !")
                                };
                                location.reload();
                            }
                        }
                    };
                    updateQuantity = (idProduitCible, colorProduitCible) =>{
                        let getInput = document.getElementById(idProduitCible + colorProduitCible);
                        let inputValue = getInput.value;
                        for (i = 0; i < existingCart.length; i ++) { 
                            if((idProduitCible === existingCart[i].id) && (colorProduitCible === existingCart[i].color)){
                                if(inputValue > 100 || inputValue == 0){
                                    alert("Merci de saisir une quantité entre 1 et 100")
                                    location.reload();
                                }else{
                                    existingCart[i].quantity = inputValue;
                                }
                                localStorage.setItem("productsInCart", JSON.stringify(existingCart));
                                location.reload();
                            }
                        }
                        
                    };
            }
        });
    };
    
    
    
    
    
    //Affichage du nombre total d'articles
    let sumQuantity = 0;
    for (let i = 0; i < existingCart.length; i++) {
        sumQuantity =  Number(sumQuantity) + Number(existingCart[i].quantity);
    }
    document.getElementById('totalQuantity').innerHTML = JSON.stringify(sumQuantity);
    
    //Affichage du prix total du panier 
    let totalPriceCart = 0;
    let targetedPrice = 0;
    for (let i = 0; i < existingCart.length; i++) {
        targetedPrice = document.getElementById(existingCart[i].id + existingCart[i].color + "price").textContent;
        let regex = /[\d]{4}/;
        regexedPrice = targetedPrice.match(regex);
        totalPriceCart += (existingCart[i].quantity * regexedPrice);
    }
    document.getElementById('totalPrice').innerHTML = totalPriceCart;

    document.getElementById('email').pattern = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});

