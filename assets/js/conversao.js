class CurrencyConverter {
    constructor() {
        this.exchangeRates = {
            "BRL": {
                "USD": 0.19, // 1 BRL = 0.19 USD
                "EUR": 0.16, // 1 BRL = 0.16 EUR
                "GBP": 0.14, // 1 BRL = 0.14 GBP
                "CNY": 1.21   // 1 BRL = 1.21 CNY
            },
            "USD": {
                "BRL": 5.34, // 1 USD = 5.34 BRL
                "EUR": 0.82, // 1 USD = 0.82 EUR
                "GBP": 0.73, // 1 USD = 0.73 GBP
                "CNY": 6.53   // 1 USD = 6.53 CNY
            },
            "EUR": {
                "USD": 1.22, // 1 EUR = 1.22 USD
                "BRL": 6.17, // 1 EUR = 6.17 BRL
                "GBP": 0.89, // 1 EUR = 0.89 GBP
                "CNY": 7.34   // 1 EUR = 7.34 CNY
            },
            "GBP": {
                "USD": 1.37, // 1 GBP = 1.37 USD
                "EUR": 1.12, // 1 GBP = 1.12 EUR
                "CNY": 8.19, // 1 GBP = 8.19 CNY
                "BRL": 7.20  // 1 GBP = 7.20 BRL
            },
            "CNY": {
                "USD": 0.15, // 1 CNY = 0.15 USD
                "EUR": 0.14, // 1 CNY = 0.14 EUR
                "GBP": 0.12, // 1 CNY = 0.12 GBP
                "BRL": 0.82  // 1 CNY = 0.82 BRL
            }
        };
    }

    convert(amount, fromCurrency, toCurrency) {
        let exchangeRate = this.exchangeRates[fromCurrency][toCurrency];
        let resultAmount = amount * exchangeRate;
        return resultAmount;
    }
}

// Função para realizar a conversão de moeda
function convert() {
    let amount = parseFloat(document.getElementById("amount").value);
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    let result = document.getElementById("result");
  
    // Instanciar a classe CurrencyConverter
    let converter = new CurrencyConverter();
  
    // Realizar a conversão utilizando o método convert da classe CurrencyConverter
     convertedAmount = converter.convert(amount, fromCurrency, toCurrency);
  
    // Exibir o resultado no HTML
    result.innerHTML = `<span class="text--resultL">${convertedAmount.toFixed(2)} ${toCurrency}</span><br>
    <span class="text--resultS">Valor equivalente a  ${amount.toFixed(2)} ${fromCurrency} no câmbio atual</span>`;

}