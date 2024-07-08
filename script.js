/* Variáveis Globais */
let nextPageURL = ""
let statusFilter = ""
let genderFilter = ""
let speciesFilter = ""

//funcao asincrona interligado com o html (body on load)
async function main() { 
    setupFilters()

    // url da api
    const api = 'https://rickandmortyapi.com/api/character';
    // response chama api com o funcao fetch 
    const response = await fetch(api);
    // data recebe a resposta da api e response trasforma em json
    const data = await response.json();

    getPageData(data);
    
    // obtem os dados da lista results na api
    const listOfCharacters = data.results;

    // carrega os personagens na tela
    loadCharactersOnPage(listOfCharacters);
};

// Recebe uma lista de personagens, cria divs de cards e coloca dentro do characters container
function loadCharactersOnPage(listOfCharacters) {
    // characteresContainer pega o elemento da div (characteres)
    const charactersContainer = document.getElementById('characters');
    // para cada character dentro de characters 
    for(character of listOfCharacters){
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
}

// Limpa os personagens da div de characters, zerando a lista
function clearCharacters() {
    // characteresContainer pega o elemento da div (characteres)
    const charactersContainer = document.getElementById('characters');

    // substitui o HTML interno da div por vazio
    charactersContainer.innerHTML = "";
}

function getPageData(data) {
    const info = data.info
    const nextPage = info.next

    // Preenche variável global nextPageURL
    nextPageURL = nextPage
}

async function loadMore() {
    if (!nextPageURL) {
        alert("Não há mais itens a serem carregados.");
        return;
    }

    // response chama api com a funcao fetch usando variável global
    const response = await fetch(nextPageURL);
    // data recebe a resposta da api e response trasforma em json
    const data = await response.json();

    // Atualiza a variavel global nextPageURL 
    const updatedNextURL = data.info.next
    nextPageURL = updatedNextURL

    // Pegar a lista de personagens
    const listOfCharacters = data.results

    // Carrega na pagina a lista de personagens
    loadCharactersOnPage(listOfCharacters)
}

// Adiciona eventos pra que, quando o usuario trocar o valor dos selects (filtros)
// atualizar as variáveis globais
function setupFilters() {
    // pega o componente de select do filtro Status
    const statusFilterSelect = document.getElementById('status-filter');

    // pega o componente de select do filtro Gender
    const genderFilterSelect = document.getElementById('gender-filter');

    // pega o componente de select do filtro Species
    const speciesFilterSelect = document.getElementById('species-filter');

    // Adiciona event listeners para eventos 'change' nos filtros

    statusFilterSelect.addEventListener('change', function() {
        statusFilter = this.value;
    });

    genderFilterSelect.addEventListener('change', function() {
        genderFilter = this.value;
    });

    speciesFilterSelect.addEventListener('change', function() {
        speciesFilter = this.value;
    });

    // Reseta os filtros
    statusFilterSelect.value = ""
    genderFilterSelect.value = ""
    speciesFilterSelect.value = ""
}

// Pega as variáveis globais, aplica os filtros na URL, e requisita de novo.
// Com os novos resultados, coloca os resultados na página
async function applyFilters() {
    // Cria URL com filtros aplicados das variáveis globais
    const urlWithFilters = `https://rickandmortyapi.com/api/character?status=${statusFilter}&gender=${genderFilter}&species=${speciesFilter}`

    // Requisita a API com essa URL
    const response = await fetch(urlWithFilters)
    const data = await response.json();

    // Remove os personagens prévios da tela
    clearCharacters();

    // Atualiza variavel nextPageURL, pra que, se eu chamar o loadMore, ela estará com o valor atualizado e com os filtros
    nextPageURL = data.info.next;

    // Obtem lista de personagens
    const listOfCharacters = data.results

    if (!listOfCharacters || listOfCharacters.length == 0) {
        alert("Nenhum personagem encontrado com os filtros selecionados")
    }

    // Carrega lista de personagens na tela
    loadCharactersOnPage(listOfCharacters);
}
