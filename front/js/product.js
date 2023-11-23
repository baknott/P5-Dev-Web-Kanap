//Fonction qui créer une balise
function createBalise(element) {
    return document.createElement(element);
}

//Fonction qui affiche une balise
function append(parent, enfant) {
    return parent.appendChild(enfant);
}

//Récupération de l'ID dans l'URL
const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');
const urlApi = 'http://localhost:3000/api/products/' + id;

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
    
    //Génération de l'image 
    append(itemImg, img); 
    
    // Génération des options couleurs 
    const parser = new DOMParser();
    const colors = document.querySelector('#colors');
    for (i = 0; i < data.colors.length; i++) {
        let productsColors = 
            `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
        const displayColors = parser.parseFromString(productsColors, "text/html");
        colors.appendChild(displayColors.body.firstChild);
    }
}))

// Attrape l'erreur lorsqu'elle se produit 
.catch(function(error) {
  alert("UNE ERREUR EST SURVENUE");
});
//---------------------------------FIN DU FETCH---------------------------------------------------------//

// Récupération des détails de la commande à venir dans le local storage 
//Dynamique, s'actualiser avant qu'on ne clique sur "ajouter au panier"

const addToCart = document.getElementById('addToCart');  


// récupère la couleur
function getColor() {
    let color = document.querySelector(`#colors`);
    return color.value;
};

// Récuperer la quantité choisie
function getQuantity() {
    let qty = document.querySelector(`#quantity`);
    return qty.value;
};

// Fonction qui envoie les éléments dans le panier
const addToStorage = (id, color, quantity) =>{
    let existingCart = JSON.parse(localStorage.getItem("productsInCart"));
    let oneProduct = {
        id : id,
        color : color,  
        quantity : quantity
    };

    //Vérification des champs et du localstorage 
    if(quantity < 1 || quantity > 100 || color == ""){
            return alert(`Veuillez choisir un coloris et sélectionner nombre d'articles valide`);
    }else{
        //Si localStorage vide
        if(localStorage.length === 0){
            existingCart =[{id : id, color : color,  quantity : quantity}];
        }else{
            let existingProduct = false;
            //On parcourt le localStorage 
            existingCart.forEach(oneProductInCart =>{
                //Si le produit existe
                if(oneProductInCart.id === oneProduct.id && oneProductInCart.color === oneProduct.color){
                    //Si Quantité > 100 on maximise à 100 + alertz
                    if((Number(oneProductInCart.quantity) + Number(oneProduct.quantity)) > 100 || (Number(oneProductInCart.quantity) + Number(oneProduct.quantity)) == 100){
                        alert("La quantité maximum de 100 articles pour cette variante a été atteinte")
                        oneProductInCart.quantity = "100";
                        existingProduct = true;
                    }else{ //Sinon on additionne la quantité deja présente
                        oneProductInCart.quantity = JSON.stringify(Number(oneProductInCart.quantity) + Number(oneProduct.quantity));
                        existingProduct = true;
                    }
                }
            });
            //Si le produit n'existe pas on le push
            if(existingProduct == false){
                existingCart.push(oneProduct);
            };
        };
    };
    //On actualise le localStorage
    localStorage.setItem("productsInCart", JSON.stringify(existingCart));
};

// Evenement Click qui execute la fonction addToStorage
addToCart.addEventListener("click", () =>{
    let color = getColor();
    let quantity = getQuantity();
    addToStorage(id, color, quantity);
    if(quantity == 1 && color != ""){
        alert("Votre article a été ajouté au panier !")
    }else if(quantity > 1 && color != ""){
        alert("Vos articles ont été ajoutés au panier !")
    };
});



