const nomes = ["Ana", "Carlos", "Beatriz", "Lucas", "Mariana", "Gabriel", "Sophia"];

export function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

export const nome = aleatorio(nomes);