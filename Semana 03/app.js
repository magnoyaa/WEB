console.log("===== BLOCO 1: FUNDAMENTOS E VARIÁVEIS =====");

let pontos = 50;
pontos += 10;
console.log("Pontos:", pontos);

const MAX_PONTOS = 100;
try {
  MAX_PONTOS = 200;
} catch (erro) {
  console.log(`${erro.name}: ${erro.message}`);
  console.log("Motivo: uma constante criada com const não pode receber um novo valor depois de declarada.");
}
console.log("MAX_PONTOS continua valendo:", MAX_PONTOS);

const texto = "JavaScript";
const numero = 42;
const verdadeiro = true;
let indefinido;
const nulo = null;

console.log("string:", typeof texto);
console.log("number:", typeof numero);
console.log("boolean:", typeof verdadeiro);
console.log("undefined:", typeof indefinido);
console.log("null:", typeof nulo);
console.log("Atenção: typeof null retorna 'object', é um bug histórico da linguagem.");

const nome = "Ana";
const idade = 20;
const fraseTemplate = `Meu nome é ${nome} e eu tenho ${idade} anos.`;
const fraseConcatenada = "Meu nome é " + nome + " e eu tenho " + idade + " anos.";
console.log(fraseTemplate);
console.log(fraseConcatenada);
console.log("As duas frases são iguais?", fraseTemplate === fraseConcatenada);

console.log("");
console.log("===== BLOCO 2: FUNÇÕES =====");

console.log("Chamando a função declarada antes da declaração (hoisting):", ehMaiorDeIdade(20));

function ehMaiorDeIdade(idade) {
  return idade >= 18;
}

console.log("ehMaiorDeIdade(15):", ehMaiorDeIdade(15));
console.log("ehMaiorDeIdade(18):", ehMaiorDeIdade(18));

try {
  console.log(ehMaiorDeIdadeExpressao(20));
} catch (erro) {
  console.log(`${erro.name}: ${erro.message}`);
  console.log("Motivo: a função de expressão está guardada em uma const, que não pode ser usada antes de ser inicializada.");
}

const ehMaiorDeIdadeExpressao = function (idade) {
  return idade >= 18;
};

console.log("ehMaiorDeIdadeExpressao(20) depois da declaração:", ehMaiorDeIdadeExpressao(20));

function dobro(n) {
  return n * 2;
}

const dobroExpressao = function (n) {
  return n * 2;
};

const dobroArrow = n => n * 2;

console.log("dobro(4):", dobro(4));
console.log("dobroExpressao(4):", dobroExpressao(4));
console.log("dobroArrow(4):", dobroArrow(4));

const dobroPadrao = (n = 1) => n * 2;

console.log("dobroPadrao() sem argumento:", dobroPadrao());
console.log("dobroPadrao(7):", dobroPadrao(7));

console.log("");
console.log("===== BLOCO 3: CONTROLE DE FLUXO =====");

function classificarNota(nota) {
  if (nota >= 6) {
    return "Aprovado";
  } else {
    return "Reprovado";
  }
}

console.log("Nota 8:", classificarNota(8));
console.log("Nota 6:", classificarNota(6));
console.log("Nota 4.5:", classificarNota(4.5));

const cores = ["vermelho", "amarelo", "verde", "azul"];

for (const corSemaforo of cores) {
  switch (corSemaforo) {
    case "vermelho":
      console.log(`${corSemaforo}: Pare`);
      break;
    case "amarelo":
      console.log(`${corSemaforo}: Atenção`);
      break;
    case "verde":
      console.log(`${corSemaforo}: Siga`);
      break;
    default:
      console.log(`${corSemaforo}: cor inválida`);
  }
}

console.log("");
console.log("Tabuada do 5:");
for (let i = 1; i <= 10; i++) {
  console.log(`5 x ${i} = ${5 * i}`);
}

console.log("");
console.log("Contagem regressiva:");
let contagem = 5;
while (contagem >= 1) {
  console.log(contagem);
  contagem--;
}
console.log("Fim!");

console.log("");
console.log("Par ou ímpar de 1 a 20 (com for):");
for (let i = 1; i <= 20; i++) {
  const tipo = i % 2 === 0 ? "par" : "ímpar";
  console.log(`${i} é ${tipo}`);
}

console.log("");
console.log("Par ou ímpar de 1 a 20 (com while):");
let j = 1;
while (j <= 20) {
  if (j % 2 === 0) {
    console.log(`${j} é par`);
  } else {
    console.log(`${j} é ímpar`);
  }
  j++;
}

function diaDaSemana(numero) {
  switch (numero) {
    case 1:
      return "Domingo";
    case 2:
      return "Segunda-feira";
    case 3:
      return "Terça-feira";
    case 4:
      return "Quarta-feira";
    case 5:
      return "Quinta-feira";
    case 6:
      return "Sexta-feira";
    case 7:
      return "Sábado";
    default:
      return "Número inválido";
  }
}

console.log("");
console.log("Dias da semana:");
console.log("diaDaSemana(1):", diaDaSemana(1));
console.log("diaDaSemana(4):", diaDaSemana(4));
console.log("diaDaSemana(7):", diaDaSemana(7));
console.log("diaDaSemana(0):", diaDaSemana(0));
console.log("diaDaSemana(8):", diaDaSemana(8));
