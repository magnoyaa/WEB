console.log("===== PARTE 1: PEDIDOS =====");

const pedidos = [
  { cliente: "Bia", valor: 120, status: "pago" },
  { cliente: "Carlos", valor: 80.5, status: "pendente" },
  { cliente: "", valor: 50, status: "pago" },
  { cliente: "Duda", valor: -10, status: "pago" },
  { cliente: "Edu", valor: "abc", status: "pago" },
  { cliente: "Fabi", valor: 200, status: "pago" },
  { cliente: "Gui", valor: 0, status: "pago" },
  { cliente: "Helena", valor: 99.9, status: "cancelado" },
  { cliente: "Iara", valor: 35.75, status: "pago" }
];

const pedidoValido = pedido =>
  typeof pedido.cliente === "string" &&
  pedido.cliente.trim() !== "" &&
  Number.isFinite(pedido.valor) &&
  pedido.valor > 0;

const pedidosValidos = pedidos.filter(pedidoValido);
const pedidosInvalidos = pedidos.filter(pedido => !pedidoValido(pedido));
const pedidosPagos = pedidosValidos.filter(pedido => pedido.status === "pago");
const totalFaturado = pedidosPagos.reduce((total, pedido) => total + pedido.valor, 0);
const textosPagos = pedidosPagos.map(pedido => `${pedido.cliente} — R$ ${pedido.valor.toFixed(2)}`);

console.log(`Pedidos recebidos: ${pedidos.length}`);
console.log(`Pedidos válidos: ${pedidosValidos.length}`);
console.log("Pedidos inválidos:", pedidosInvalidos);
console.log("Pedidos pagos:", pedidosPagos);
textosPagos.forEach(texto => console.log(texto));
console.log(`Total faturado: R$ ${totalFaturado.toFixed(2)}`);

async function buscarJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) {
    const erro = new Error(`Erro HTTP ${response.status}`);
    erro.status = response.status;
    throw erro;
  }
  return await response.json();
}

function mostrarStatus(elemento, texto, erro = false) {
  elemento.textContent = texto;
  elemento.classList.toggle("erro", erro);
}

function mensagemDeErro(erro) {
  if (erro.name === "TimeoutError") {
    return "A conexão demorou demais. Tente novamente.";
  }
  return "Falha na conexão. Verifique sua internet e tente novamente.";
}

const formCep = document.querySelector("#form-cep");
const campoCep = document.querySelector("#cep");
const botaoCep = document.querySelector("#botao-cep");
const statusCep = document.querySelector("#status-cep");
const resultadoCep = document.querySelector("#resultado-cep");
const historicoCep = document.querySelector("#historico-cep");
const historico = [];

function limparCep(valor) {
  return valor.trim().replace(/[\s-]/g, "");
}

function cepValido(cep) {
  return /^\d{8}$/.test(cep);
}

function mostrarEndereco(dados) {
  const campos = [
    ["Rua", dados.logradouro],
    ["Bairro", dados.bairro],
    ["Cidade", dados.localidade],
    ["UF", dados.uf]
  ];

  resultadoCep.replaceChildren();
  campos.forEach(([rotulo, valor]) => {
    const dt = document.createElement("dt");
    dt.textContent = rotulo;
    const dd = document.createElement("dd");
    dd.textContent = valor || "-";
    resultadoCep.append(dt, dd);
  });
}

function mostrarHistorico() {
  historicoCep.replaceChildren();
  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.cep} — ${item.cidade}/${item.uf}`;
    historicoCep.append(li);
  });
}

formCep.addEventListener("submit", async e => {
  e.preventDefault();

  const cep = limparCep(campoCep.value);
  resultadoCep.replaceChildren();

  if (!cepValido(cep)) {
    mostrarStatus(statusCep, "CEP inválido. Digite exatamente 8 números.", true);
    return;
  }

  mostrarStatus(statusCep, "Buscando...");
  botaoCep.disabled = true;

  try {
    const dados = await buscarJson(`https://viacep.com.br/ws/${cep}/json/`);

    if (dados.erro) {
      mostrarStatus(statusCep, "CEP não encontrado", true);
      return;
    }

    mostrarEndereco(dados);
    mostrarStatus(statusCep, "");
    historico.unshift({ cep: dados.cep || cep, cidade: dados.localidade, uf: dados.uf });
    mostrarHistorico();
  } catch (erro) {
    mostrarStatus(statusCep, mensagemDeErro(erro), true);
  } finally {
    botaoCep.disabled = false;
  }
});

const formPokemon = document.querySelector("#form-pokemon");
const campoPokemon = document.querySelector("#pokemon");
const botaoPokemon = document.querySelector("#botao-pokemon");
const statusPokemon = document.querySelector("#status-pokemon");
const resultadoPokemon = document.querySelector("#resultado-pokemon");

function mostrarPokemon(dados) {
  const nome = document.createElement("h3");
  nome.textContent = dados.name;

  const tipos = document.createElement("p");
  tipos.textContent = `Tipos: ${dados.types.map(item => item.type.name).join(", ")}`;

  resultadoPokemon.replaceChildren(nome);

  if (dados.sprites.front_default) {
    const imagem = document.createElement("img");
    imagem.src = dados.sprites.front_default;
    imagem.alt = `Imagem de ${dados.name}`;
    resultadoPokemon.append(imagem);
  }

  resultadoPokemon.append(tipos);
}

formPokemon.addEventListener("submit", async e => {
  e.preventDefault();

  const nome = campoPokemon.value.trim().toLowerCase();
  resultadoPokemon.replaceChildren();

  if (nome === "") {
    mostrarStatus(statusPokemon, "Digite o nome de um Pokémon.", true);
    return;
  }

  mostrarStatus(statusPokemon, "Buscando...");
  botaoPokemon.disabled = true;

  try {
    const dados = await buscarJson(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome)}`);
    mostrarPokemon(dados);
    mostrarStatus(statusPokemon, "");
  } catch (erro) {
    if (erro.status === 404) {
      mostrarStatus(statusPokemon, "Pokémon não encontrado", true);
    } else {
      mostrarStatus(statusPokemon, mensagemDeErro(erro), true);
    }
  } finally {
    botaoPokemon.disabled = false;
  }
});
