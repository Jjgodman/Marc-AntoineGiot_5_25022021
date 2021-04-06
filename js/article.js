main()

async function main() {
    const info = await getInfo()
    displayInfo(info)
}

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

function displayInfo(info) {
    var url = document.location.href.replace(/\$/,"");
    var urlid = url.substring(url.lastIndexOf("/")+1);
    urlid=urlid.replace(".html","");
    lenses=info.find(x => x._id === urlid).lenses;
    const prixN =info.find(x => x._id === urlid).price;
    prix= prixN.toString();
    len = prix.length;
    prixFinal=prix.substring(0,len-2)+','+prix.substring(len-2,len);
    document.getElementById("article").innerHTML = '<img src='+info.find(x => x._id === urlid).imageUrl+' alt="camera"><div class="describe"><h1 class="text_describe">'+info.find(x => x._id === urlid).name+'</h1><h2 class="text_describe">'+info.find(x => x._id === urlid).description+'</h2><select class="text_describe" id ="model"><option value="">Choisissez un modele</option></select><p class="text_describe price">Prix : '+prixFinal+'€</p><input type="button" value="Ajouter au panier"></div>';
    for (lense of lenses) {
        const model = document.getElementById("model");
        const newElt = document.createElement("option");
        newElt.setAttribute("value",lense);
        newElt.innerHTML = lense;
        model.appendChild(newElt);
    }
}

//'<img src=${info.find(x => x._id === urlid).imageUrl} alt="camera"><div class="describe">