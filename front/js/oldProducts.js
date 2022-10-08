function createBalise(element) {
    return document.createElement(element);
}
function append(parent, enfant) {
    return parent.appendChild(enfant);
}
//Récupération de l'ID dans l'URL
let urlPage = document.location.href; 
let url = new URL(urlPage);
let search_params = new URLSearchParams(url.search); 
var idProduct = search_params.get('id');

const urlApi = `http://localhost:3000/api/products/${idProduct}`;
//-----------------------------------DEBUT DU FETCH----------------------------------------------------//
fetch(urlApi)  //Recupère l'url de l'api
.then((resp) => resp.json()     // vérifie la promesse/reponse
.then((data) => {   
    //Variables de récupération/creation des balises html 
    const itemImg = document.querySelector('div.item__img'); 
    const title = document.getElementById('title');          
    const description = document.getElementById('description');  
    const price = document.getElementById('price');
    const img = createBalise('img');
    
    //Caractérisation de l'image à afficher
    img.src = `${data.imageUrl}`;
    img.alt = `${data.altTxt}`;
    

    //Insertion des valeurs dans les champs 
    title.innerHTML = `${data.name}`;
    description.innerHTML = `${data.description}`;
    price.innerHTML = `${data.price}`;
    
    append(itemImg, img); //Génération de l'image 
    
    // Génération des options qui 
    const parser = new DOMParser();
    const colors = document.querySelector('#colors');
    for (i = 0; i < data.colors.length; i++) {
        let productsColors = 
            `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
        const displayColors = parser.parseFromString(productsColors, "text/html");
        colors.appendChild(displayColors.body.firstChild);}
    
        
}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});
//---------------------------------FIN DU FETCH---------------------------------------------------------//

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
        
        
    };
//On vérifie si la sélection est valide
    if(quantity.value < 1 || quantity.value > 100 || colors.value == ""){
        return alert(`Veuillez choisir un coloris et sélectionner nombre d'articles valide`);
    };
//Si la selection est valide on vérifie s'il existe déjà la clé "productsInCart", si oui on inject simplement l'objet dans le tableau qu'on rajoute ensuite dans le localStorage
    if(existingCart){
        for(let i = 0; i <= existingCart.length; i ++){
            if((existingCart[i].id == idProduct) && (existingCart[i].color == oneProduct.color)){
                existingCart[i].quantity = String(Number(existingCart[i].quantity) + Number(oneProduct.quantity));
                console.log("variante existante");
                console.log(oneProduct);
                break

            }else{
                existingCart.push(oneProduct);
                console.log("variante INexistante");
            };
        };
        console.log("if after check est censé ajouter l'élement ou la quantité au storage");
    }else{   //Si pas de localStorage, créer le tableau et injecter le produit dans le localStorage 
        existingCart = [{id : idProduct, color : colors.value, quantity : quantity.value}];
    };
    localStorage.setItem("productsInCart", JSON.stringify(existingCart));
});
//-------------------------------Fin addEventListener 'click'------------------------------------------//


