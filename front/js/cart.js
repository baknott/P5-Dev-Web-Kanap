const urlApi = 'http://localhost:3000/api/products';
// URL de l'api

fetch(urlApi)  //Recupère l'url de l'api
.then((resp) => resp.json()     // vérifie la promesse/reponse
.then((data) => {   
    const parser = new DOMParser();
    const cart__items = document.getElementById('cart__items');
    
    //Boucle For, pour chaque élément dans l'api, doit créer un nouvel élément 
    for (i = 0; i < data.length; i ++) { 
        //Paterne des éléments à créer sous forme de string
        let cartProducts = 
        `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
                <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data[i].name}</h2>
                    <p>Vert</p>
                    <p>${data[i].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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
}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});