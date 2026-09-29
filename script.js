import { perguntas } from "./perguntas.js";
import { aleatorio, nome } from "./aleatorio.js";

const caixaInicial = document.querySelector(".caixa-inicial");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const btnIniciar = document.querySelector(".iniciar-btn");
const btnNovamente = document.querySelector(".novamente-btn");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

btnIniciar.addEventListener("click", iniciaJogo);
btnNovamente.addEventListener("click", jogaNovamente);

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);
    }
}

function iniciaJogo() {
    substituiNome();
    caixaInicial.classList.add("esconder");
    caixaPerguntas.classList.remove("esconder");
    caixaAlternativas.classList.remove("esconder");
    mostraPergunta();
}

function mostraPergunta() {
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacaoSelecionada = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacaoSelecionada + " ";

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

function mostraResultado() {
    caixaPerguntas.classList.add("esconder");
    caixaAlternativas.classList.add("esconder");
    caixaResultado.classList.remove("esconder");
    textoResultado.textContent = `Em 2049, ${nome}: ${historiaFinal}`;
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.add("esconder");
    caixaInicial.classList.remove("esconder");
}