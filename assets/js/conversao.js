class CurrencyConverter {
    constructor() {
        this.exchangeRates = {
            "BRL": {
                "USD": 0.19,
                "EUR": 0.16,
                "GBP": 0.14,
                "CNY": 1.21
            },
            "USD": {
                "BRL": 5.34,
                "EUR": 0.82,
                "GBP": 0.73,
                "CNY": 6.53
            },
            "EUR": {
                "USD": 1.22,
                "BRL": 6.17,
                "GBP": 0.89,
                "CNY": 7.34
            },
            "GBP": {
                "USD": 1.37,
                "EUR": 1.12,
                "CNY": 8.19,
                "BRL": 7.20
            },
            "CNY": {
                "USD": 0.15,
                "EUR": 0.14,
                "GBP": 0.12,
                "BRL": 0.82
            }
        };
    }

    convert(amount, fromCurrency, toCurrency) {
        if (!this.exchangeRates[fromCurrency] || !this.exchangeRates[fromCurrency][toCurrency]) {
            console.error('Moedas selecionadas inválidas.');
            return null;
        }
        
        let exchangeRate = this.exchangeRates[fromCurrency][toCurrency];
        let resultAmount = amount * exchangeRate;
        return resultAmount;
    }
}

function convert() {
    let amount = parseFloat(document.getElementById("amount").value);
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    let result = document.getElementById("result");

    let converter = new CurrencyConverter();
    let convertedAmount = converter.convert(amount, fromCurrency, toCurrency);

    if (convertedAmount !== null) {
        let conversionRecord = {
            amount: amount,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            resultAmount: convertedAmount,
            timestamp: new Date().toLocaleString()
        };

        let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
        conversionHistory.push(conversionRecord);
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));

        result.innerHTML = `<span class="text--resultL">${convertedAmount.toFixed(2)} ${toCurrency}</span><br>
        <span class="text--resultS">Valor equivalente a  ${amount.toFixed(2)} ${fromCurrency} no câmbio atual</span>`;

        updateTransactionHistory();
    } else {
        result.innerHTML = `<span class="text--resultL">Erro:</span><br> 
        <span class="text--resultS">Moedas selecionadas inválidas</span>`;
    }
}

function updateTransactionHistory() {
    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    let historyElement = document.getElementById('transactionHistory');
    historyElement.innerHTML = '';

    conversionHistory.forEach(record => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            ------------------------------------------------<br>
            <span>Valor convertido: ${record.amount.toFixed(2)} ${record.fromCurrency} = ${record.resultAmount.toFixed(2)} ${record.toCurrency}</span><br>
            <span>Data e hora: ${record.timestamp}</span><br>
        `;
        historyElement.appendChild(listItem);
    });
}

function toggleTransactionHistory() {
    let historyElement = document.getElementById('transactionHistory');
    if (historyElement.style.display === 'none') {
        historyElement.style.display = 'block';
    } else {
        historyElement.style.display = 'none';
    } // Função para exibir e ocultar o extrato 
}
function clearTransactionHistory() {
    localStorage.removeItem('conversionHistory');
    updateTransactionHistory(); // Atualiza o extrato após limpar
}



document.addEventListener('DOMContentLoaded', updateTransactionHistory);
