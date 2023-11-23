//----------------------- COMMANDE-------------------------------------------------------------
//Declarations de variables liées aux champs du formulaire
const postUrl = 'http://localhost:3000/api/products/order/';
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const form = document.querySelector('.cart__order__form');
//----Regex ---//
const patternEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const patternNamesAndCity = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
const patternAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
// Retourne un nom de champ
const fieldNames = {
    prenom : "prénom",
    nom : "nom",
    adresse : "adresse",
    ville : "ville",
    email : "adresse email"
}
// Messages d'erreur
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const emailErrorMsg = document.getElementById('emailErrorMsg');
// fonction qui analyse la validité d'un champ en fonction des paramètres choisis
const validField = (anInput, aRegex, anErrorMsg, fieldName) => {
    if (aRegex.test(anInput.value)) {
        anErrorMsg.innerText = ``;
        return true;
    }else{
        anErrorMsg.innerText = `Merci de bien vouloir corriger votre ` + fieldName;
        return false;
    } 
}
//---Verification de chaque champ du formulaire----//
firstName.addEventListener('change', function() {
    validField(firstName, patternNamesAndCity, firstNameErrorMsg, fieldNames.prenom);
});
lastName.addEventListener('change', function() {
    validField(lastName, patternNamesAndCity, lastNameErrorMsg, fieldNames.nom);
});
address.addEventListener('change', function() {
    validField(address, patternAddress, addressErrorMsg, fieldNames.adresse);
});
city.addEventListener('change', function() {
    validField(city, patternNamesAndCity, cityErrorMsg, fieldNames.ville);
});
email.addEventListener('change', function() {
    validField(email, patternEmail, emailErrorMsg, fieldNames.email);
});
//--------------//

// récupère les données du formulaire, les stocke dans un objet "contact"
// + récupère les ID des produits du panier
// Enfin, tous les éléments précédents sont stockés dans "objectToSend" 
const createObjectToSend = () =>{
    let contact = {
        firstName : firstName.value,
        lastName :lastName.value,
        address : address.value,
        city : city.value,
        email : email.value
    }
    let products = [];
    for (i = 0; i < existingCart.length; i++) {
        if (products.find((e) => e == existingCart[i].id)) {
            console.log('not found');
        } else {
            products.push(existingCart[i].id);
        }
    }
    objectToSend = JSON.stringify({contact, products});
    return objectToSend
}
//Fonction qui envoie les données du formulaire + les id des produits du panier vers le serveur
const submitOrder = () =>{    
    if(localStorage.length === 0 || existingCart.length === 0){
        alert('votre panier est vide !')
    }else{
        //On vérifie la validité de tous les champs
        if(validField(firstName, patternNamesAndCity, firstNameErrorMsg, fieldNames.prenom) && validField(lastName, patternNamesAndCity, lastNameErrorMsg, fieldNames.nom) && validField(address, patternAddress, addressErrorMsg, fieldNames.adresse) && validField(city, patternNamesAndCity, cityErrorMsg, fieldNames.ville) && validField(email, patternEmail, emailErrorMsg, fieldNames.email)){
            let objectToSend = createObjectToSend();
            fetch('http://localhost:3000/api/products/order/', {
                
                method: "POST",
                
                headers: {
                    "Content-type": "application/json"
                },
                
                body: objectToSend
            })
            .then((response) => response.json())
            .then((data) =>{  
                localStorage.clear();
                document.querySelector('.cart__order__form').reset();
                document.location.href = "confirmation.html?id=" + data.orderId;
            })
            .catch(function(error) {
                alert("UNE ERREUR EST SURVENUE");
            });
        }else{
            alert('Merci de vérifier les informations saisies')
        }
    }
}
//----Ecoute l'evenement submit-----//
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    submitOrder();  
});

