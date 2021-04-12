mainIndex()

async function mainIndex() {
    const info = await getInfoIndex()
    displayInfoIndex(info)
}
//récuperation des données de l'api
function getInfoIndex() {
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
//affichage des produit
function displayInfoIndex (info) {
    for (produit of info) {
        document.getElementById('produit_acceuil').innerHTML += (`
        <a href="./html/produits/`+produit._id+`.html">
            <img src="`+produit.imageUrl+`" alt="camera">
            <span>`+produit.name+`</span>
        </a>`)
    }
}