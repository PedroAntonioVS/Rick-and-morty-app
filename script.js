async function main() {
    const api = 'https://rickandmortyapi.com/api/character';
    const response = await fetch(api);
    const data = await response.json();
    const characters = data.results;

    const charactersContainer = document.getElementById('characters');
    for(character of characters){
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character');
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p>${character.name}</p>
        `;
        charactersContainer.appendChild(characterDiv);
    };
};