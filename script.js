let cardContainer = document.querySelector(".card-container");
let dados = [];
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("botao-busca");

async function iniciarBusca() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);

    searchButton.addEventListener("click", () => {
        realizarBusca(searchInput.value);
    });
}

function realizarBusca(termo) {
    const termoBusca = termo.toLowerCase();
    const resultados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";
    if (dados.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }
    dados.forEach(dado => {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano || dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    });
}

iniciarBusca();
