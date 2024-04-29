// Módulo para manipulação de moeda
class ConversorMoeda {
    constructor(taxas) {
        this.taxas = taxas;
    }

    converter(valor, moedaDestino) {
        const taxa = this.taxas[moedaDestino];
        if (!taxa) {
            console.log("Moeda de destino inválida.");
            return 0;
        }
        return valor * taxa;
    }

    aplicarIOF(valor) {
        const descontoIOF = valor * 0.011; // 1.1% de IOF
        return valor - descontoIOF;
    }
}

// Módulo para interface do usuário
class InterfaceUsuario {
    static exibirOpcoes() {
        console.log("Opções de Conversão:");
        console.log("1. BRL para USD (Dólares Americanos)");
        console.log("2. BRL para EUR (Euros)");
        console.log("3. BRL para GBP (Libra Esterlina)");
        console.log("4. BRL para CNY (Yuan Chinês)");
        console.log("5. Sair");
    }

    static receberEscolha() {
        return prompt("Escolha uma opção (1, 2, 3, 4 ou 5):");
    }

    static receberValorReais() {
        return parseFloat(prompt("Insira o valor em Reais (BRL):"));
    }

    static exibirResultadoSemIOF(valor, moeda) {
        console.log(`O valor em ${moeda} sem IOF é: ${valor.toFixed(2)}`);
    }

    static exibirResultadoComIOF(valor, moeda) {
        console.log(`O valor em ${moeda} com IOF é: ${valor.toFixed(2)}`);
    }
}

// Módulo de controle principal
class ConversorController {
    constructor() {
        this.taxasMoeda = {
            dolar: 0.20,
            euro: 0.18,
            libra: 0.16,
            yuan: 1.42
        };
        this.conversor = new ConversorMoeda(this.taxasMoeda);
    }

    iniciarConversao() {
        let continuar = true;
        while (continuar) {
            InterfaceUsuario.exibirOpcoes();
            const escolha = InterfaceUsuario.receberEscolha();
            switch (escolha) {
                case '1':
                case '2':
                case '3':
                case '4':
                    this.realizarConversao(escolha);
                    break;
                case '5':
                    console.log("Saindo do programa...");
                    continuar = false;
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }

    realizarConversao(escolha) {
        const valorReais = InterfaceUsuario.receberValorReais();
        if (isNaN(valorReais)) {
            console.log("Valor em Reais inválido.");
            return;
        }

        let moedaDestino;
        switch (escolha) {
            case '1':
                moedaDestino = 'dolar';
                break;
            case '2':
                moedaDestino = 'euro';
                break;
            case '3':
                moedaDestino = 'libra';
                break;
            case '4':
                moedaDestino = 'yuan';
                break;
        }

        const valorMoeda = this.conversor.converter(valorReais, moedaDestino);
        InterfaceUsuario.exibirResultadoSemIOF(valorMoeda, moedaDestino.toUpperCase());
        const valorMoedaComIOF = this.conversor.aplicarIOF(valorMoeda);
        InterfaceUsuario.exibirResultadoComIOF(valorMoedaComIOF, moedaDestino.toUpperCase());
    }
}

// Instanciando e iniciando o controlador
const conversorController = new ConversorController();
conversorController.iniciarConversao();