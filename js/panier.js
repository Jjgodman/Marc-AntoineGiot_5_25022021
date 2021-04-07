let produitLocalStorage =JSON.parse( localStorage.getItem("produit"));
const tab = document.getElementById("tabPanier")
if (produitLocalStorage){
    for (produit of produitLocalStorage) {
        jsProduit = (JSON.stringify(produit))
        const prix = parseFloat(produit.prixPanier)*parseFloat(produit.quantite)
        tab.innerHTML+=(
            '<table><tbody><tr><td class="ligne_2"><img src="'+produit.image+'" alt="camera"></td><td class="ligne_2">'+produit.nom+'</td><td class="ligne_2">'+produit.choixLense+'</td><td class="ligne_2">'+produit.quantite+'</td><td class="ligne_2">'+produit.prixPanier+'</td><td class="ligne_2">'+prix.toFixed(2)+'</td>'
        )
    }
}
else {
    tab.innerHTML=('<p>Pannier vide</p>')
}