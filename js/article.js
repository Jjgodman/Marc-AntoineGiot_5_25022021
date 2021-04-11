//----------------------------------------création des pages produit------------------------------------------
//initialisation des fonctions
main()

async function main() {
    const info = await getInfo()
    
    console.log(info[1].lenses)
    displayInfo(info)
}
//récuperation des données de l'api
function getInfo() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(info) {
            return info
        })
        .catch(function(error) {
            alert(error)
        })
}
//gestion des données
function displayInfo(info) {
    //récupération de l'id du produit via l'url
    var url = document.location.href.replace(/\$/,"");
    var urlid = url.substring(url.lastIndexOf("/")+1);
    urlid=urlid.replace(".html","");
    //création des variable pour facilité le innerHTML
    lenses=info.find(x => x._id === urlid).lenses;
    //mise en forme du prix pour avoir les centimes
    const prixN =info.find(x => x._id === urlid).price;
    prix= prixN.toString();
    len = prix.length;
    prixFinal=prix.substring(0,len-2)+','+prix.substring(len-2,len);
    //affichage des données sur la page
    let article = document.getElementById("article")
    article.innerHTML = '<img src='+info.find(x => x._id === urlid).imageUrl+' alt="camera"><div class="describe"><h1 class="text_describe">'+info.find(x => x._id === urlid).name+'</h1><h2 class="text_describe">'+info.find(x => x._id === urlid).description+'</h2><select class="text_describe" id ="model"></select><p class="text_describe price">Prix : '+prixFinal+'€</p><input id="button" type="button" value="Ajouter au panier"></div>';
    console.log(info)
    console.log(info.find(x => x._id === urlid).name)
    //gestion à part de l'affichage des options d'achats pour faciliter l'utilisation de la boucle for
    for (lense of lenses) {
        const model = document.getElementById("model");
        const newElt = document.createElement("option");
        newElt.setAttribute("value",lense);
        newElt.innerHTML = lense;
        model.appendChild(newElt);
    };
//stockage des données
    const sendArticle = document.getElementById("button");
    //stockage des données quand on clique sur le boutton d'ajout au panier
    sendArticle.addEventListener('click', (event)=>{
        event.preventDefault();
        const model = document.getElementById("model").value;
        //variable où les données sont stocker
        let infoCommande = {
            nom: info.find(x => x._id === urlid).name,
            id: urlid,
            image: info.find(x => x._id === urlid).imageUrl,
            choixLense: model,
            quantite: 1,
            prixPanier: parseFloat(prixFinal.toString().replace(',' , '.'))
        }
        //--------------------------------------stockage des données dans le local storage--------------------------------------------          

        let produitLocalStorage =JSON.parse( localStorage.getItem("product_id"));
        if(produitLocalStorage) {
            produitLocalStorage.push(infoCommande);
            localStorage.setItem("product_id", JSON.stringify(produitLocalStorage));
        }
        else {
            produitLocalStorage = [];
            produitLocalStorage.push(infoCommande);
            localStorage.setItem("product_id", JSON.stringify(produitLocalStorage));
        }
    });
}