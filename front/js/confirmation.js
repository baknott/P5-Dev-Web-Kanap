//Récupération de l'ID dans l'URL 
const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');
//Affichage de l'ID
document.getElementById('orderId').innerHTML = id;