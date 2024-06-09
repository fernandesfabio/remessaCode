const key = "fca_live_rMwakp88F0k0BVUFVWtwtgUPdd2OEsIASXs0KFna";
const transactionKey = 'transactions';
const state = {
  openedDrawer: null,
  currencies: [],
  filteredCurrencies: [],
  base: "BRL",
  target: "USD",
  rates: {},
  baseValue: 1,
};

//* selectors

const ui = {
  controls: document.getElementById("controls"),
  drawer: document.getElementById("drawer"),
  dismissBtn: document.getElementById("dismiss-btn"),
  currencyList: document.getElementById("currency-list"),
  searchInput: document.getElementById("search"),
  baseBtn: document.getElementById("base"),
  targetBtn: document.getElementById("target"),
  exchangeRate: document.getElementById("exchange-rate"),
  baseInput: document.getElementById("base-input"),
  targetInput: document.getElementById("target-input"),
  swapBtn: document.getElementById("swap-btn"),
  sendMoneyBtn: document.getElementById("send-money-btn"),
  viewHistoryBtn: document.getElementById("view-history-btn"),
  clearHistoryBtn: document.getElementById("clear-history-btn"),
  transactionHistory: document.getElementById("transaction-history")
};

//* event listeners

const setupEventListeners = () => {
  document.addEventListener("DOMContentLoaded", initApp);
  ui.controls.addEventListener("click", showDrawer);
  ui.dismissBtn.addEventListener("click", hideDrawer);
  ui.searchInput.addEventListener("input", filterCurrency);
  ui.currencyList.addEventListener("click", selectPair);
  ui.baseInput.addEventListener("input", convertInput);
  ui.swapBtn.addEventListener("click", switchPair);
  ui.sendMoneyBtn.addEventListener("click", sendMoney);
  ui.viewHistoryBtn.addEventListener("click", toggleTransactionHistory);
  ui.clearHistoryBtn.addEventListener("click", clearTransactionHistory);
};

//* event handlers

const initApp = () => {
  fetchCurrencies();
  fetchExchangeRate();
};

const showDrawer = (e) => {
  if (e.target.hasAttribute("data-drawer")) {
    state.openedDrawer = e.target.id;
    ui.drawer.classList.add("show");
  }
};

const hideDrawer = () => {
  clearSearchInput();
  state.openedDrawer = null;
  ui.drawer.classList.remove("show");
};

const filterCurrency = () => {
  const keyword = ui.searchInput.value.trim().toLowerCase();
  state.filteredCurrencies = getAvailableCurrencies().filter(
    ({ code, name }) => code.toLowerCase().includes(keyword) || name.toLowerCase().includes(keyword)
  );
  displayCurrencies();
};

const selectPair = (e) => {
  if (e.target.hasAttribute("data-code")) {
    state[state.openedDrawer] = e.target.dataset.code;
    loadExchangeRate();
    hideDrawer();
  }
};

const convertInput = () => {
  const inputValue = ui.baseInput.value.replace(/,/g, '.');
  state.baseValue = parseFloat(inputValue) || 1;
  loadExchangeRate();
};

const switchPair = () => {
  // Swap base and target currencies
  [state.base, state.target] = [state.target, state.base];

  // Swap base and target input values
  const targetValue = parseFloat(ui.targetInput.value.replace(/,/g, '.')) || 1;
  state.baseValue = targetValue;

  // Load the new exchange rate after swapping
  loadExchangeRate();
};

//* render functions

const displayCurrencies = () => {
  ui.currencyList.innerHTML = state.filteredCurrencies
    .map(({ code, name }) => `
      <li data-code="${code}">
        <img src="${getImageURL(code)}" alt="${name}" />
        <div>
          <h4>${code}</h4>
          <p>${name}</p>
        </div>
      </li>
    `)
    .join("");
};

const displayConversion = () => {
  updateButtons();
  updateInputs();
  updateExchangeRate();
};

const showLoading = () => {
  ui.controls.classList.add("skeleton");
  ui.exchangeRate.classList.add("skeleton");
};

const hideLoading = () => {
  ui.controls.classList.remove("skeleton");
  ui.exchangeRate.classList.remove("skeleton");
};

//* helper functions

const updateButtons = () => {
  [ui.baseBtn, ui.targetBtn].forEach((btn) => {
    const code = state[btn.id];
    btn.textContent = code;
    btn.style.setProperty("--image", `url(${getImageURL(code)})`);
  });
};

const updateInputs = () => {
  const { base, baseValue, target, rates } = state;
  const result = baseValue * rates[base][target];
  ui.targetInput.value = result.toFixed(2);
  ui.baseInput.value = baseValue.toFixed(2);
};

const updateExchangeRate = () => {
  const { base, target, rates } = state;
  ui.exchangeRate.textContent = `1 ${base} = ${formatNumber(rates[base][target])} ${target}`;
};

const getAvailableCurrencies = () => {
  return state.currencies.filter(({ code }) => state.base !== code && state.target !== code);
};

const clearSearchInput = () => {
  ui.searchInput.value = "";
  ui.searchInput.dispatchEvent(new Event("input"));
};

const getImageURL = (code) => {
  return `https://wise.com/public-resources/assets/flags/rectangle/${code.toLowerCase()}.png`;
};

const loadExchangeRate = () => {
  const { base, rates } = state;
  if (rates[base]) {
    displayConversion();
  } else {
    fetchExchangeRate();
  }
};

//* transaction functions

const sendMoney = () => {
  const { base, target, rates } = state;
  const amount = parseFloat(ui.baseInput.value.replace(/,/g, '.')) || 0;
  const convertedAmount = amount * rates[base][target];

  const transaction = {
    date: new Date().toLocaleString(),
    from: base,
    to: target,
    amount: formatNumber(amount),
    convertedAmount: formatNumber(convertedAmount)
  };

  saveTransaction(transaction);
  Swal.fire({
    title: "Valor enviado com sucesso!",
    text: "Enviado " + formatNumber(convertedAmount) + " " + target,
    icon: "success"
  });
};

const saveTransaction = (transaction) => {
  const transactions = JSON.parse(localStorage.getItem(transactionKey)) || [];
  transactions.push(transaction);
  localStorage.setItem(transactionKey, JSON.stringify(transactions));
};

const getTransactions = () => {
  return JSON.parse(localStorage.getItem(transactionKey)) || [];
};

const displayTransactions = () => {
  const transactions = getTransactions();
  ui.transactionHistory.innerHTML = transactions.map(tx => `
    <div>
      <p>Date: ${tx.date}</p>
      <p>From: ${tx.amount} ${tx.from}</p>
      <p>To: ${tx.convertedAmount} ${tx.to}</p>
    </div>
  `).join('');
};

const toggleTransactionHistory = () => {
  if (ui.transactionHistory.style.display === 'none' || ui.transactionHistory.style.display === '') {
    ui.transactionHistory.style.display = 'block';
    ui.clearHistoryBtn.classList.remove('hidden');
    displayTransactions();
  } else {
    ui.transactionHistory.style.display = 'none';
    ui.clearHistoryBtn.classList.add('hidden');
  }
};

const clearTransactionHistory = () => {
  localStorage.removeItem(transactionKey);
  displayTransactions();
};

//* api functions

const fetchCurrencies = () => {
  fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${key}`)
    .then((response) => response.json())
    .then(({ data }) => {
      state.currencies = Object.values(data);
      state.filteredCurrencies = getAvailableCurrencies();
      displayCurrencies();
    })
    .catch(console.error);
};

const fetchExchangeRate = () => {
  const { base } = state;
  showLoading();
  fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${key}&base_currency=${base}`)
    .then((response) => response.json())
    .then(({ data }) => {
      state.rates[base] = data;
      displayConversion();
    })
    .catch(console.error)
    .finally(hideLoading);
};

//* utility functions

const formatNumber = (number) => {
  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

//* initialization

setupEventListeners();
