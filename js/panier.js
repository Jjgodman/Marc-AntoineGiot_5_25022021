//recuperation du local storage
let product_id =JSON.parse( localStorage.getItem("product_id"));

//si il y a quelque chose dans le local storage alors on creer le panier
const tab = document.getElementById("tabPanier")
if (product_id){

    let prixT = 0;
    tab.innerHTML = (`
    <table>
        <tbody>
            <tr>
                <td class="ligne_1">Produit</td>
                <td class="ligne_1">Nom</td>
                <td class="ligne_1">Optique</td>
                <td class="ligne_1">Prix</td>
            </tr>
        </tbody>
    </table>`)
    
    for (produit of product_id) {
        
        
        document.querySelector('tbody').innerHTML+=(

            `<tr>
                <td class="ligne_2" style="display: none;">`+produit.id+`</td>
                <td class="ligne_2"><img src="`+produit.image+`" alt="camera" class="reducImg"></td>
                <td class="ligne_2">`+produit.nom+`</td>
                <td class="ligne_2">`+produit.choixLense+`</td>
                <td class="ligne_2">`+produit.prixPanier.toFixed(2)+` €</td>
            </tr>`
        )
        prixT += produit.prixPanier
        localStorage.setItem("price", JSON.stringify(prixT))
    }

    document.querySelector('tbody').innerHTML += (`
    <tr>
        <td class="ligne_3" colspan="3">Total</td>
        <td class="ligne_3">`+prixT.toFixed(2)+` €</td>
    </tr>`)
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
        <label for="city">Ville</label>
        <input type="text" id="city" name="user_city" placeholder="Ville" autocomplete="address-level2">
    </div>
    <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" autocomplete="email">
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
    
    //verifiquation que tout les element du formulaire sont bien au bon format
    function valide() {
        if (product_id 
            && /^[A-Za-z-]{3,25}$/.test(document.getElementById("nom").value) 
            && /^[A-Za-z-]{3,25}$/.test(document.getElementById("prenom").value) 
            && /^([0-9]*) ?([a-zA-Z,\. ]*)$/.test(document.getElementById("adresse").value) 
            && /^[A-Za-z-]{3,25}$/.test(document.getElementById("city").value) 
            && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value)){
            const contact = {
                firstName: document.getElementById("prenom").value,
                lastName: document.getElementById("nom").value,
                address: document.getElementById("adresse").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            }
            //envoi au local storage
            localStorage.setItem("contact", JSON.stringify(contact))
            //mise en forme des donné pour l'envoi au serveur
            products=[]
            for (prod of product_id) {
                products.push(prod.id)
            }
            //objet envoyé au serveur
            envServ={
                contact : contact,
                products : products
            }
            postServ(envServ)

        }

        else if(!product_id){
            alert('Pannier vide')
            
        }
        else{
            alert("Saisissez de bonne information de contact")
        }
    }
    valide()

})

//fonction d'envoie des donnnée au serveur
async function postServ(envServ) {
    const test = JSON.stringify(envServ)
    //envoi des donné au serveur
    try{
        let response = await fetch ("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {
                    "Content-Type" : "application/json",
                },
            body: test,
        });
        //si c'est bon cela renvoie vers la page formulaire
        if (response.ok) {
            let responseServ = await response.json()
            localStorage.setItem("commandeConfirm", responseServ.orderId)
            window.location.href ="confirme.html"
        }
        //sinon cela marque leretour serveur
        else {
            console.error('Retour du serveur : ', response.status);
        }
    }
    catch (e) {
        console.log(e)
    }
}



