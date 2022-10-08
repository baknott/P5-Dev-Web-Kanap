function createBalise(element) {
    return document.createElement(element);
}
//Fonction "creer un balise"

function append(parent, enfant) {
    return parent.appendChild(enfant);
}
//Fonction "Générer la balise enfant dans le HTML"

const urlApi = 'http://localhost:3000/api/products';
// URL de l'api

fetch(urlApi)  //Recupère l'url de l'api
.then((resp) => resp.json()     // vérifie la promesse/reponse
.then((data) => {   
    const items = document.getElementById('items');
    
    //Boucle For, pour chaque élément dans l'api, doit créer un nouvel élément 
    for (i = 0; i < data.length; i ++) { 
        
        //Appel de la fonction createBalise sous forme de variable
        let a = createBalise('a');
        let article = createBalise('article');
        let img = createBalise('img');
        let h3 = createBalise('h3');
        let p = createBalise('p');

        //Caractérisation des différentes balises
        a.href = `./product.html?id=${data[i]._id}`;
        img.src = `${data[i].imageUrl}`;
        img.alt = `${data[i].altTxt}`;
        h3.classList.add("productName");
        h3.innerHTML = `${data[i].name}`;
        p.classList.add("productDescription");
        p.innerHTML = `${data[i].description}`;

        //Génération de tous les éléments 
        append(items, a);
        append(a, article);
        append(article, img);
        append(article, h3);
        append(article, p); 
    }
}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});







// Récuperer l'id dans l'url

const qStr = window.location.search;

const urlParams = new URLSearchParams(qStr);

const id = urlParams.get('id');

const apiUrl = 'http://localhost:3000/api/products/' + id;

// Si il y a un id, appeler l'api pour chercher les informations du produit d'id

fetch(apiUrl)
    .then((response) => response.json()
    .then((data) => {
            
        // Afficher les images
        let img = document.querySelector('.item__img');
        img.innerHTML = `<img src='${data.imageUrl}' alt='${data.altTxt}'>`;
            
        // Afficher les noms
        let name = document.querySelector('#title');
        name.innerHTML = `${data.name}`;
            
        // Afficher les prix
        let price = document.querySelector('#price');
        price.innerHTML = `${data.price}`;

        // Afficher les descriptions
        let desc = document.querySelector('#description');
        desc.innerHTML = `${data.description}`;

        // Afficher les couleurs
        const parser = new DOMParser();
        const colors = document.querySelector('#colors');
        
        for (i = 0; i < data.colors.length; i++) {
            let productsColors = 
                `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
            const displayColors = parser.parseFromString(productsColors, "text/html");
            colors.appendChild(displayColors.body.firstChild);
        }
    }))
    
    .catch((err) => 
        document.querySelector('.item').innerText = `Le produit est introuvable !`);

//******** Récuperer les valeurs du HTML sélectionnées par l'utilisateur ********/

// Récuperer la couleur choisie
function colorValue() {
    let color = document.querySelector(`#colors`);
    return color.value;
};

// Récuperer la quantité choisie
function qtyValue() {
    let qty = document.querySelector(`#quantity`);
    return qty.value;
};

// Fonction ajouter un produit dans le localStorage
    const addToCartHTMLElement = (id, color, qty) => {
    
        // Si la couleur est vide --> Erreur
        if (color == "" && qty == "0") {
            return alert(`Veuillez choisir une couleur et une quantité entre 1 et 100`)
        }

        if (color == "") {
            return alert(`Veuillez choisir une couleur`);
        }

        // Si la quantité n'est pas entre 1 et 100 --> Erreur 
        if (qty <= 0 || qty >= 101) {
            return alert(`Veuillez choisir une quantité entre 1 et 100`)
        }

        let itemsLocalStorage = getCart();
        // Si le panier n'existe pas, le créer dans objet dans un tableau
        if (itemsLocalStorage.length == 0) {
            itemsLocalStorage = [{id: id, color: color, qty: qty}];
        
        // Si le panier existe
        } else {
            let found = false;
            // Si l'id et la couleur de l'item existe déjà dans le tableau du panier, incrémenter la quantité choisie à la quantité du panier
            for (let i = 0; i < itemsLocalStorage.length; i++) {
                if (id === itemsLocalStorage[i].id && color === itemsLocalStorage[i].color) {
                    found = true;
                    itemsLocalStorage[i].qty += qty;
                }
            }
            // S'ils n'existent pas, créer un nouvel objet item dans le tableau du panier
            if (found == false) {
                let item = {id: id, color: color, qty: qty};
                itemsLocalStorage.push(item); 
            }
        }
        
        localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
        alert(`Produit(s) ajouté(s) au panier !`);
    }


// Lors du 'click' on écoute la couleur et la quantité du produit sélectionné et si elles sont valides, les ajouter au panier
addToCart.addEventListener(`click`, () => {
    let color = colorValue();
    let qty = parseInt(qtyValue());
    addToCartHTMLElement(id, color, qty);
});

function colorValue() {
    let color = document.querySelector(`#colors`);
    return color.value;
};












// BORDEL DE MERDE 
const checkProductsInCart = () =>{
    for(let i = 0; i <= existingCart.length; i ++){
        if((existingCart[i].id == idProduct) && (existingCart[i].color == oneProduct.color)){
            existingCart[i].quantity = String(Number(existingCart[i].quantity) + Number(oneProduct.quantity));
            console.log("check variante existante if");
            console.log(oneProduct);
            break;
        }else if((existingCart[i].id != idProduct) || ((existingCart[i].id == idProduct) && (existingCart[i].color != oneProduct.color))){
            existingCart.push(oneProduct);
            console.log("check product variante inexistante else");
            console.log(oneProduct);
            break;
        }; 
    }  
};











// Récupération des détails de la commande à venir dans le local storage 
//Dynamique, s'actualiser avant qu'on ne clique sur "ajouter au panier"
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById('addToCart');  


//---------------------------------Debut addEventListener 'click'------------------------------------------//
//-> Ecoute l'evenement 'click' sur le bouton d'ajout au panier
addToCart.addEventListener("click", () =>{

//Objet oneProduct représentant les caractéristiques du produit à ajouter au panier (id + couleur + quantité du produit)
    let oneProduct = {
        id : idProduct,
        color : colors.value,
        quantity : quantity.value
    };

//Variable qui récupère un panier déjà existant
    let existingCart = JSON.parse(localStorage.getItem("productsInCart"));
    
//Fonction qui chck l'existance d'un produit d'une certaine couleur dans le panier, s'il existe on ajoute la quantity supplémentaire voulu
    const checkProductsInCart = () =>{
        let found = false;
        for(let i = 0; i <= existingCart.length; i ++){
            if((existingCart[i].id == idProduct) && (existingCart[i].color == oneProduct.color)){
                existingCart[i].quantity = String(Number(existingCart[i].quantity) + Number(oneProduct.quantity));
                console.log("variante existante");
                console.log(oneProduct);
                
            }else{
                found = true;
            };
            
        };
        if(found){
            existingCart.push(oneProduct);
            console.log("variante INexistante");
        };
        
    };
//On vérifie si la sélection est valide
    if(quantity.value < 1 || quantity.value > 100 || colors.value == ""){
        return alert(`Veuillez choisir un coloris et sélectionner nombre d'articles valide`);
    }else{
//Si la selection est valide on vérifie s'il existe déjà la clé "productsInCart", si oui on inject simplement l'objet dans le tableau qu'on rajoute ensuite dans le localStorage
        if(existingCart){
            checkProductsInCart();
            console.log("if after check est censé ajouter l'élement ou la quantité au storage");
        }else{   //Si pas de localStorage, créer le tableau et injecter le produit dans le localStorage 
            existingCart = [{id : idProduct, color : colors.value, quantity : quantity.value}];
            console.log("else tableau initial");
        };
    };    
    localStorage.setItem("productsInCart", JSON.stringify(existingCart));
});