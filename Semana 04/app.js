const meuNome = "Seu Nome";

console.log("===== BLOCO 1: ARRAYS E MÉTODOS =====");

const nomes = ["Ana", "Bruno", "Carla"];

nomes.forEach(nome => {
  console.log(`Olá, ${nome}!`);
});

const nomesMaiusculos = nomes.map(nome => nome.toUpperCase());
console.log("Nomes em maiúsculas:", nomesMaiusculos);
console.log("Array original não mudou:", nomes);

const precos = [10, 25, 40, 5, 60];
const precosAcima20 = precos.filter(preco => preco > 20);
const somaPrecos = precos.reduce((total, preco) => total + preco, 0);

console.log("Preços acima de 20:", precosAcima20);
console.log("Soma dos preços:", somaPrecos);

const produtos = [
  { nome: "Caderno", preco: 15 },
  { nome: "Mochila", preco: 120 },
  { nome: "Caneta", preco: 3 },
  { nome: "Calculadora", preco: 45 },
  { nome: "Fichário", preco: 80 }
];

const nomesProdutos = produtos.map(produto => produto.nome);
const produtosBaratos = produtos.filter(produto => produto.preco < 50);
const somaProdutos = produtos.reduce((total, produto) => total + produto.preco, 0);

console.log("Nomes dos produtos:", nomesProdutos);
console.log("Produtos com preço menor que 50:", produtosBaratos);
console.log("Soma dos preços dos produtos:", somaProdutos);

produtos.forEach(produto => {
  console.log(`${produto.nome}: R$ ${produto.preco}`);
});

console.log("");
console.log("===== BLOCO 2: MANIPULAÇÃO DO DOM =====");

const titulo = document.querySelector("#titulo");
titulo.textContent = `Blog do ${meuNome}`;

const paragrafos = document.querySelectorAll(".texto");
paragrafos.forEach(paragrafo => {
  console.log(paragrafo.textContent);
});

const lista = document.querySelector("#lista");
lista.innerHTML += "<li>Primeiro item</li><li>Segundo item</li>";

const terceiroItem = document.createElement("li");
terceiroItem.textContent = "Terceiro item";
lista.append(terceiroItem);

terceiroItem.classList.add("destaque");
console.log('O terceiro item tem a classe "destaque"?', terceiroItem.classList.contains("destaque"));

const tarefas = ["Estudar JS", "Fazer exercícios", "Revisar DOM"];
tarefas.forEach(tarefa => {
  const li = document.createElement("li");
  li.textContent = tarefa;
  lista.append(li);
});

lista.querySelector("li").classList.add("feito");
console.log("Total de itens na lista:", document.querySelectorAll("li").length);

console.log("");
console.log("===== BLOCO 3: EVENTOS =====");

const botao = document.querySelector("#botao");

botao.addEventListener("click", () => {
  console.log("Clicou!");
});

botao.addEventListener("mouseover", () => {
  botao.textContent = "Pode clicar!";
});

const campoNome = document.querySelector("#nome");

campoNome.addEventListener("keyup", () => {
  console.log(campoNome.value);
});

lista.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("feito");
    console.log(e.target.textContent);
  }
});

const itemNovo = document.createElement("li");
itemNovo.textContent = "Item criado depois do listener";
lista.append(itemNovo);

const formulario = document.querySelector("#formulario");
const campoTarefa = document.querySelector("#tarefa");

formulario.addEventListener("submit", e => {
  e.preventDefault();

  const texto = campoTarefa.value.trim();
  if (texto === "") {
    return;
  }

  const li = document.createElement("li");
  li.textContent = texto;
  lista.append(li);
  campoTarefa.value = "";
});
