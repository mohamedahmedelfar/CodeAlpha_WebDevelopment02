// Get elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');

// Initialize expenses array from local storage or create new one
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render expenses
function renderExpenses() {
  // Clear expense list
  expenseList.innerHTML = '';

  // Render each expense
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name}: $${expense.amount}</span>
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });

  // Save expenses to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add expense
function addExpense(name, amount) {
  expenses.push({ name, amount });
  renderExpenses();
}

// Function to edit expense
function editExpense(index) {
  const newName = prompt('Enter new expense name:');
  const newAmount = parseFloat(prompt('Enter new amount:'));
  if (!isNaN(newAmount)) {
    expenses[index].name = newName;
    expenses[index].amount = newAmount;
    renderExpenses();
  }
}

// Function to delete expense
function deleteExpense(index) {
  if (confirm('Are you sure you want to delete this expense?')) {
    expenses.splice(index, 1);
    renderExpenses();
  }
}

// Event listener for form submit
expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  if (name && !isNaN(amount)) {
    addExpense(name, amount);
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  } else {
    alert('Please enter a valid expense name and amount.');
  }
});

// Render initial expenses
renderExpenses();
