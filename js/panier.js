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