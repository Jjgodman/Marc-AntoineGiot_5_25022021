//---------------------------mise en forme de la page de confirmation ------------------------------
let prix = JSON.parse(localStorage.getItem("price"))
let nCmd = localStorage.getItem("commandeConfirm")
document.getElementById("page_confirme").innerHTML = (`
<h1>Merci pour votre commande</h1>
<p>Votre commande sera traitée au plus vite, vous recevrez prochainement un mail de confirmation ainsi que le numéro d'envoi</p>
<p>Numéro de facture : <br>`+nCmd+`</p>
<p>Prix total : `+prix.toFixed(2)+`€</p>`)