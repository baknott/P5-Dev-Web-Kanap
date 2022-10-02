const urlApi = 'http://localhost:3000/api/products';
// URL de l'api

fetch(urlApi)  //Recupère l'url de l'api
.then((resp) => resp.json()     // vérifie la promesse/reponse
.then((data) => {   
    const parser = new DOMParser();
    const items = document.getElementById('items');
    
    //Boucle For, pour chaque élément dans l'api, doit créer un nouvel élément 
    for (i = 0; i < data.length; i ++) { 
        //Paterne des éléments à créer sous forme de string
        let allProducts = 
        `<a href="./product.html?id=${data[i]._id}">
            <article>
                <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
                <h3 class="productName">${data[i].name}</h3>
                <p class="productDescription">${data[i].description}</p>
            </article>
        </a>`;
        //On transforme l'élément allProducts(string) en document HTML
        const showAllProducts = parser.parseFromString(allProducts, "text/html");
        //On affiche les différents éléments
        items.appendChild(showAllProducts.body.firstChild);
    }
}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});