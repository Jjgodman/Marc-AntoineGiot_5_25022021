//recuperation du local storage
let produitLocalStorage =JSON.parse( localStorage.getItem("produit"));

//si il y a quelque chose dans le local storage alors on creer le panier
const tab = document.getElementById("tabPanier")
if (produitLocalStorage){

    let prixT = 0;
    tab.innerHTML = ('<table><tbody><tr><td class="ligne_1">Produit</td><td class="ligne_1">Nom</td><td class="ligne_1">Optique</td><td class="ligne_1">Prix</td></tr></tbody></table>' )
    
    for (produit of produitLocalStorage) {
        
        
        document.querySelector('tbody').innerHTML+=(

            '<tr><td class="ligne_2" style="display: none;">'+produit.id+'</td><td class="ligne_2"><img src="'+produit.image+'" alt="camera" class="reducImg"></td><td class="ligne_2">'+produit.nom+'</td><td class="ligne_2">'+produit.choixLense+'</td><td class="ligne_2">'+produit.prixPanier.toFixed(2)+' €</td></tr>'
        )
        prixT += produit.prixPanier
        
    }
    document.querySelector('tbody').innerHTML += ('<tr><td class="ligne_3" colspan="3">Total</td><td class="ligne_3">'+prixT.toFixed(2)+' €</td>')
}
//sinon on ecrit que le panier est vide
else {
    tab.innerHTML=('<p>Pannier vide</p>')
}
//boutton pour supprimer le panier
document.getElementById("supp").addEventListener('click', (e)=>{
    localStorage.clear()
    document.location.reload()
})
//---------------------------------cration du formaulaire d'envoi--------------------------------------------
const form =`
<form action="/ma-page-de-traitement" method="post" onsubmit="return valide()">
    <div>
        <label for="nom">Nom</label>
        <input name="nom" id="nom" placeholder="Nom" autocomplete="family-name">
    </div>
    <div>
        <label for="prenom">Prénom</label>
        <input id="prenom" name="prenom" placeholder="Prénom" autocomplete="given-name">
    </div>
    <div>
        <label for="adresse">Adresse</label>
        <input id="adresse" name="user_adresse" placeholder="Adresse" autocomplete="address-line1" >
    </div>
    <div>
        <label for="cp">Code postal</label>
        <input type="text" id="cp" name="user_cp" placeholder="Code postal" autocomplete="postal-code" pattern="[0-9][0-9][0-9][0-9][0-9]">
    </div>
    <div>
        <label for="city">Ville</label>
        <input type="text" id="city" name="user_city" placeholder="Ville" autocomplete="address-level2">
    </div>
    <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" autocomplete="email">
    </div>
    <div>
        <label for="comment">Commentaires</label>
        <input type="text" id="comment" name="user_comment">
    </div>
    <div>
        <input type="submit" id="submit" name="envoyer">
    </div>
</form>
`
document.getElementById("form").innerHTML=(form)




//envoie du formulaire dans le local sorage quand on clique sur envoyer
const btnEnv = document.getElementById("submit")
btnEnv.addEventListener('click', (e) => {
    e.preventDefault()
    

    function valide() {
        if (produitLocalStorage && document.getElementById("nom").value !="" && document.getElementById("prenom").value !="" && document.getElementById("adresse").value !="" && document.getElementById("cp").value !="" && document.getElementById("city").value !="" &&document.getElementById("email").value !=""){
            const formFull = {
                nom: document.getElementById("nom").value,
                prenom: document.getElementById("prenom").value,
                adresse: document.getElementById("adresse").value,
                cp: document.getElementById("cp").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
                comment: document.getElementById("comment").value
            }
        
            localStorage.setItem("form", JSON.stringify(formFull))
        }
        else if(!produitLocalStorage){
            alert('Pannier vide')
            
        }
        else{
            alert("Saisissez toute les information")
        }
    }
    valide()


    //creation de l'array pour les information client
    const formFull = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        adresse: document.getElementById("adresse").value,
        cp: document.getElementById("cp").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
        comment: document.getElementById("comment").value
    }

    localStorage.setItem("form", JSON.stringify(formFull))

    const envoieServ={
        produitLocalStorage,
        formFull
    }
})

