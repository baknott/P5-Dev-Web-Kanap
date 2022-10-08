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
    //Boucle For, pour chaque élément dans l'api, doit créer un nouvel élément 
    const dataExtractor = (idProductInCart, dataToExtract) =>{
        for (i = 0; i < data.length; i ++) { 
            if (idProductInCart === data[0]._id){
                let dataToReturn = data[0].dataToExtract;
            };
        };
        alert(dataToReturn);
    };
    
    
    for (i = 0; i < existingCart.length; i ++) { 
        //Paterne des éléments à créer sous forme de string
       
        let cartProducts = 
        `<article class="cart__item" data-id="${existingCart[i].id}" data-color="${existingCart[i].color}">
            <div class="cart__item__img">
                <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data[i].name}</h2>
                    <p>${existingCart[i].color}</p>
                    <p>${data[i].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${existingCart[i].quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${existingCart[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
        //On transforme l'élément allProducts(string) en document HTML
        const showAllProducts = parser.parseFromString(cartProducts, "text/html");
        //On affiche les différents éléments
        cart__items.appendChild(showAllProducts.body.firstChild);
    }
    let quantityInput = document.querySelector('input.itemQuantity');
    console.log(quantityInput);
}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});

