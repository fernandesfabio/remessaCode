// Função para aplicar o imposto IOF
function aplicarIOF(valor) {
    const descontoIOF = valor * 0.011; // 1.1% de IOF
    return valor - descontoIOF;
}

// Função para converter valor em Reais (BRL) para Dólares Americanos (USD)
function converterParaDolar(valorBRL) {
    const taxaConversaoUSD = 0.19; // Exemplo de taxa de conversão: 1 BRL = 0.19 USD
    const valorUSD = valorBRL * taxaConversaoUSD;
    return aplicarIOF(valorUSD).toFixed(2);
}

// Função para converter valor em Reais (BRL) para Euros (EUR)
function converterParaEuro(valorBRL) {
    const taxaConversaoEUR = 0.16; // Exemplo de taxa de conversão: 1 BRL = 0.16 EUR
    const valorEUR = valorBRL * taxaConversaoEUR;
    return aplicarIOF(valorEUR).toFixed(2);
}

// Função para exibir as opções de conversão
function exibirOpcoes() {
    console.log("Opções de Conversão:");
    console.log("1. BRL para USD (Dólares Americanos)");
    console.log("2. BRL para EUR (Euros)");
    console.log("3. Sair");
}

// Função para lidar com a escolha do usuário
function processarEscolha(escolha) {
    let valorBRL;
    switch (escolha) {
        case '1':
            valorBRL = parseFloat(prompt("Insira o valor em Reais (BRL):"));
            console.log(`Valor em Dólares (USD): ${converterParaDolar(valorBRL)}`);
            break;
        case '2':
            valorBRL = parseFloat(prompt("Insira o valor em Reais (BRL):"));
            console.log(`Valor em Euros (EUR): ${converterParaEuro(valorBRL)}`);
            break;
        case '3':
            console.log("Saindo do programa...");
            break;
        default:
            console.log("Opção inválida. Tente novamente.");
    }
}

// Loop while para fornecer opções contínuas de conversão
let continuar = true;
while (continuar) {
    exibirOpcoes();
    const escolha = prompt("Escolha uma opção (1, 2, ou 3):");
    processarEscolha(escolha);
    if (escolha === '3') {
        continuar = false;
    }
}
