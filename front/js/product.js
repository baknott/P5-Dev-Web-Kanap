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
addToCart.addEventListener("click", (event) =>{
    event.preventDefault();

//Objet oneProduct représentant les caractéristiques du produit à ajouter au panier (id + couleur + quantité du produit)
    let oneProduct = {
        id : `${idProduct}`,
        color : colors.value,
        quantity : quantity.value
    };

//Variable qui récupère un panier déjà existant
    let existingCart = JSON.parse(localStorage.getItem("productsInCart"));
    
//Fonction qui push la sélection dans le tableau existingCart[] puis on le stocke dans le localStorage
    const pushToStorage = () =>{
        existingCart.push(oneProduct);
        localStorage.setItem("productsInCart", JSON.stringify(existingCart));
    };

//Fonction qui chck l'existance d'un produit d'une certaine couleur dans le panier, s'il existe on ajoute la quantity supplémentaire voulu
    const checkProductsInCart = () =>{
        for(i = 0; i < existingCart.length; i ++){
            if((existingCart[i].id == oneProduct.id) && (existingCart[i].color == oneProduct.color)){
                existingCart[i].quantity = Number(existingCart[i].quantity) + Number(oneProduct.quantity);
                //localStorage.removeItem("productsInCart");
                localStorage.setItem("productsInCart", JSON.stringify(existingCart));
            }else{
                pushToStorage();
            };    
        }  
    };

//On vérifie si la sélection est valide
    if(quantity.value < 1 || quantity.value > 100 || colors.value == ""){
        return alert(`Veuillez choisir un coloris et sélectionner nombre d'articles valide`);
    
    }else{
//Si la selection est valide on vérifie s'il existe déjà la clé "productsInCart", si oui on inject simplement l'objet dans le tableau qu'on rajoute ensuite dans le localStorage
        if(existingCart){
            checkProductsInCart();
            //popUpConfirm();
        }else{
            existingCart = [];
            pushToStorage();
            //popUpConfirm();
        }
    }    
})
//-------------------------------Fin addEventListener 'click'------------------------------------------//





//Popup de confirmation d'ajout au panier (local storage pour l'instant)
const popUpConfirm = () =>{
    window.confirm("Votre sélection a bien été ajoutée au panier")
};