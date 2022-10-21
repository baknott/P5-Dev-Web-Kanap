//----------------------- COMMANDE-------------------------------------------------------------
//Declarations de variables liées aux champs du formulaire
const postUrl = 'http://localhost:3000/api/products/order/';
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const form = document.querySelector('.cart__order__form');
const orderNumber = 0;

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
    
    //----Regex ---//
    let patternEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let patternNamesAndCity = /[a-zA-Z-]+/;
    let patternAddress = /[a-zA-Z0-9-]+/;
    
    //----Test des regex-----//
    let regexEmail = patternEmail.test(email.value);
    let regexFirstName = patternNamesAndCity.test(firstName.value);
    let regexLastName = patternNamesAndCity.test(lastName.value);
    let regexCity = patternNamesAndCity.test(city.value);
    let regexAddress = patternAddress.test(address.value);
    if(localStorage.length === 0 || existingCart.length === 0){
        alert('votre panier est vide !')
    }else{
        if(regexEmail && regexFirstName && regexLastName && regexCity && regexAddress){
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

