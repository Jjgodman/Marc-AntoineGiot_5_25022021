//----------------------------------------création des pages produit------------------------------------------
//initialisation des fonctions
main()

async function main() {
    const info = await getInfo()
    displayInfo(info)
    eventListener (info)
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

 //récupération de l'id du produit via l'url
 function recupId() {
    var url = document.location.href.replace(/\$/,"");
    var urlid = url.substring(url.lastIndexOf("/")+1);
    urlid=urlid.replace(".html","");
    return urlid;
}

//mise en forme du prix pour avoir les centimes
function price(info) {
    const prixN = info.find(x => x._id === recupId()).price;
    prix= prixN.toString();
    len = prix.length;
    prixFinal= prix.substring(0,len-2)+','+prix.substring(len-2,len);
    return prixFinal
}

//affichage des données sur la page
function displayInfo(info) {
    let article = document.getElementById("article")
    const floatPrice = price(info)
    article.innerHTML = `
    <img src=`+info.find(x => x._id === recupId()).imageUrl+` alt="camera">
    <div class="describe">
        <h1 class="text_describe">`+info.find(x => x._id === recupId()).name+`</h1>
        <h2 class="text_describe">`+info.find(x => x._id === recupId()).description+`</h2>
        <select class="text_describe" id ="model"></select>
        <p class="text_describe price">Prix : `+floatPrice+`€</p>
        <input id="button" type="button" value="Ajouter au panier">
    </div>`;
    listeLense(info)
}

//gestion à part de l'affichage des options du produit 
async function listeLense (info){
    lenses=info.find(x => x._id === recupId()).lenses;
    for (lense of lenses) {
        const model = await document.getElementById("model");
        const newElt = document.createElement("option");
        newElt.setAttribute("value",lense);
        newElt.innerHTML = lense;
        model.appendChild(newElt);
    };
}

//addEventListener sur le bouton
async function eventListener (info) {
    const sendArticle = document.getElementById("button");
    //stockage des données quand on clique sur le boutton d'ajout au panier
    sendArticle.addEventListener('click', (event)=>{
        event.preventDefault();
        const model = document.getElementById("model").value;
        //variable où les données sont stocker
        let infoCommande = {
            nom: info.find(x => x._id === recupId()).name,
            id: recupId(),
            image: info.find(x => x._id === recupId()).imageUrl,
            choixLense: model,
            quantite: 1,
            prixPanier: parseFloat(price(info).toString().replace(',' , '.'))
        }
        envoiDonnees(infoCommande)
    })
}

//envoie des données dans le local storage
function envoiDonnees (infoCommande){
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
}