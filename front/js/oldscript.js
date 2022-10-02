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