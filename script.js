// Function to update the totals in the UI
function updateTotals() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    document.getElementById('total-income').innerText = totalIncome.toFixed(2);
    document.getElementById('total-expenses').innerText = Math.abs(totalExpenses).toFixed(2);
    document.getElementById('net-balance').innerText = (totalIncome + totalExpenses).toFixed(2);
}

// Function to render transactions in the list
function renderTransactions() {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.description} - ${transaction.category} 
            <span>${transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}</span>
            <button onclick="removeTransaction(${index})">x</button>
        `;
        transactionList.appendChild(li);
    });
}

// Function to add a transaction
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (description && amount && category) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push({
            description: description,
            amount: amount,
            category: category
        });

        localStorage.setItem('transactions', JSON.stringify(transactions));

        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';

        renderTransactions();
        updateTotals();
    } else {
        alert('Please fill in all fields');
    }
});

// Function to remove a transaction
function removeTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    renderTransactions();
    updateTotals();
}

// Initial setup
renderTransactions();
updateTotals();
