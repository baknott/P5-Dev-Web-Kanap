function createBalise(element) {
    return document.createElement(element);
}
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

const addToCart = document.getElementById('addToCart');  


//---------------------------------Debut addEventListener 'click'------------------------------------------//
//-> Ecoute l'evenement 'click' sur le bouton d'ajout au panier
function getColor() {
    let color = document.querySelector(`#colors`);
    return color.value;
};

// Récuperer la quantité choisie
function getQuantity() {
    let qty = document.querySelector(`#quantity`);
    return qty.value;
};

const addToStorage = (id, color, quantity) =>{
    let existingCart = JSON.parse(localStorage.getItem("productsInCart"));
    let oneProduct = {
        id : id,
        color : color,  
        quantity : quantity
    };

    //Vérification des champs 
    if(quantity < 1 || quantity > 100 || color == ""){
            return alert(`Veuillez choisir un coloris et sélectionner nombre d'articles valide`);
    }else{

        if(localStorage.length === 0){
            existingCart =[{id : id, color : color,  quantity : quantity}];
            alert("LocalStorage est vide donc on injecte le premier produit ! ");
        }else{
            let existingProduct = false;
            
            existingCart.forEach(oneProductInCart =>{
                if(oneProductInCart.id === oneProduct.id && oneProductInCart.color === oneProduct.color){
                    oneProductInCart.quantity = JSON.stringify(Number(oneProductInCart.quantity) + Number(oneProduct.quantity));
                    existingProduct = true;
                }
            });

            if(existingProduct == false){
                existingCart.push(oneProduct);
            };
        };
    };
    localStorage.setItem("productsInCart", JSON.stringify(existingCart));

};

addToCart.addEventListener("click", () =>{
    let color = getColor();
    let quantity = getQuantity();
    addToStorage(id, color, quantity);
    if(quantity == 1){
        alert("Votre article a été ajouté au panier !")
    }else{
        alert("Vos articles ont été ajoutés au panier !")
    };
    window.location.href = "http://127.0.0.1:5500/front/html/index.html";
});
//-------------------------------Fin addEventListener 'click'------------------------------------------//



