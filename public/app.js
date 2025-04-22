const filmes = [
  {
    id: 1,
    titulo: "O Grande Mistério",
    imagem: "https://picsum.photos/id/121/204/300",
    descricao: "Um suspense envolvente do início ao fim.",
    sinopseLonga: "Neste filme emocionante, seguimos a jornada de um detetive tentando resolver um caso misterioso.",
    imagemDestaque: "https://picsum.photos/id/121/1000/400",
    imagensExtras: [
      "https://picsum.photos/id/250/200/300",
      "https://picsum.photos/id/251/200/300"
    ]
  },
  {
    id: 2,
    titulo: "Aventura nas Estrelas",
    imagem: "https://picsum.photos/id/120/204/300",
    descricao: "Exploração intergaláctica e emoções sem fim.",
    sinopseLonga: "Uma jornada épica pelos confins do universo onde a amizade e coragem são postas à prova.",
    imagemDestaque: "https://picsum.photos/id/120/1000/400",
    imagensExtras: [
      "https://picsum.photos/id/252/200/300",
      "https://picsum.photos/id/253/200/300"
    ]
  },
  {
    id: 3,
    titulo: "Corações em Paris",
    imagem: "https://picsum.photos/id/1027/204/300",
    descricao: "Uma história romântica nos encantos da França.",
    sinopseLonga: "Dois corações se encontram em Paris e vivem um amor inesquecível nas margens do Sena.",
    imagemDestaque: "https://picsum.photos/id/1027/1000/400",
    imagensExtras: [
      "https://picsum.photos/id/254/200/300",
      "https://picsum.photos/id/255/200/300"
    ]
  },
  {
    id: 4,
    titulo: "A Lenda do Dragão",
    imagem: "https://picsum.photos/id/231/204/300",
    descricao: "Aventura e fantasia num reino perdido.",
    sinopseLonga: "Em um mundo mágico, um jovem guerreiro precisa enfrentar um dragão ancestral para salvar seu povo.",
    imagemDestaque: "https://picsum.photos/id/231/1000/400",
    imagensExtras: [
      "https://picsum.photos/id/256/200/300",
      "https://picsum.photos/id/257/200/300"
    ]
  }
];

// ✅ Definindo o filme de destaque (último da lista)
const filmeDestaque = filmes[filmes.length - 1];

if (document.getElementById("lista-filmes")) {
  const container = document.getElementById("lista-filmes");

  // Garante que o destaque esteja por último
  const filmesOrdenados = filmes.filter(f => f.id !== filmeDestaque.id);
  filmesOrdenados.push(filmeDestaque);

  filmesOrdenados.forEach(filme => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <a href="detalhes.html?id=${filme.id}" class="text-decoration-none text-white">
        <div class="card bg-dark border-light text-white">
          <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
          <div class="card-body">
            <h5 class="card-title">${filme.titulo}</h5>
            <p class="card-text small">${filme.descricao}</p>
          </div>
        </div>
      </a>
    `;

    container.appendChild(col);
  });
}

// ✅ Renderiza o destaque na Home
if (document.getElementById("filme-destaque")) {
  const destaque = filmeDestaque;

  const container = document.getElementById("filme-destaque");
  container.innerHTML = `
    <a href="detalhes.html?id=${destaque.id}">
      <img src="${destaque.imagemDestaque}" alt="${destaque.titulo}" class="img-fluid rounded object-fit-cover w-100 principal-hover" style="max-height: 500px;">
    </a>
  `;
}

// ✅ Renderiza o carrossel de destaques
if (document.getElementById("carousel-itens")) {
  const carouselContainer = document.getElementById("carousel-itens");

  filmes.forEach((filme, index) => {
    const activeClass = index === 0 ? "active" : "";
    const item = document.createElement("div");
    item.className = `carousel-item ${activeClass}`;
    item.innerHTML = `
      <a href="detalhes.html?id=${filme.id}" class="text-white text-decoration-none">
        <img src="${filme.imagemDestaque}" class="d-block w-100 rounded" style="max-height: 500px; object-fit: cover;" alt="${filme.titulo}">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-2">
          <h5>${filme.titulo}</h5>
          <p class="small">${filme.descricao}</p>
        </div>
      </a>
    `;
    carouselContainer.appendChild(item);
  });
}

// ✅ Renderiza página de detalhes
if (window.location.pathname.includes("detalhes.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const filme = filmes.find(f => f.id === id);

  if (filme) {
    const container = document.getElementById("detalhes-filme");

    container.innerHTML = `
      <div class="mb-4">
        <img src="${filme.imagemDestaque}" class="img-fluid rounded w-100 mb-4" alt="${filme.titulo}">
        <div class="bg-dark text-white p-4 rounded shadow">
          <h2>${filme.titulo}</h2>
          <p>${filme.sinopseLonga}</p>
          <a href="index.html" class="btn btn-outline-light mt-3">← Voltar para Home</a>
        </div>
      </div>
      <div class="row mt-4">
        ${filme.imagensExtras.map(img => `
          <div class="col-6 col-md-4 mb-3">
            <img src="${img}" class="img-fluid rounded" alt="Cena do filme ${filme.titulo}">
          </div>
        `).join("")}
      </div>
    `;
  } else {
    document.getElementById("detalhes-filme").innerHTML = `
      <div class="text-center mt-5">
        <h3 class="text-danger">Filme não encontrado</h3>
        <a href="index.html" class="btn btn-outline-light mt-3">← Voltar para Home</a>
      </div>
    `;
  }
}