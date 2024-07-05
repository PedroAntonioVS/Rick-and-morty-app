//funcao asincrona interligado com o html (body on load)
async function main() { 
    // url da api
    const api = 'https://rickandmortyapi.com/api/character';
    // responce chama api com o funcao fetch 
    const response = await fetch(api);
    // data recebe a resposta da api e response trasforma em json
    const data = await response.json();
    // obtem os dados da lista results na api
    const characters = data.results;
    // characteresContainer pega o elemento da div (characteres)
    const charactersContainer = document.getElementById('characters');
    // para cada character dentro de characters 
    for(character of characters){
        // cria uma div dentro da div (characters)
        const characterDiv = document.createElement('div');
        //adiciona uma classe chamada (character)
        characterDiv.classList.add('character');
        // troca o html interno da div character
        characterDiv.innerHTML = `
        <a href = detail.html?id=${character.id} >

            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
        </a>
        `;
        // charactersContainer adiciona (characterDiv) como filho
        charactersContainer.appendChild(characterDiv);
    };
};
