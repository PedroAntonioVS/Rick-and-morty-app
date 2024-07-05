//funcao asincrona interligado com o html (body on load)
async function main() { 
    // url da api
    const api = 'https://rickandmortyapi.com/api/character/'+getId();
    // responce chama api com o funcao fetch 
    const response = await fetch(api);
    // data recebe a resposta da api e response trasforma em json
    const data = await response.json();
    const imgDiv = document.getElementById("img")
    const nameDiv = document.getElementById("name")
    const statusDiv = document.getElementById("status")
    const typeDiv = document.getElementById("type")
    const genderDiv = document.getElementById("gender")
    const originDiv = document.getElementById("origin")
    nameDiv.innerHTML =`${data.name}`
    statusDiv.innerHTML = `Status: ${data.status}`
    typeDiv.innerHTML = `Type: ${data.type}`
    genderDiv.innerHTML = `Gender: ${data.gender}`
    originDiv.innerHTML = `Origin: ${data.origin.name}`
    imgDiv.src = `https://rickandmortyapi.com/api/character/avatar/${getId()}.jpeg`

}
function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}