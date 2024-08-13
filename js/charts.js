let categoryChart;

function createCategoryChart() {
    const ctx = document.getElementById('category-chart').getContext('2d');
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Spending by Category'
                }
            }
        }
    });
}

function updateCategoryChart() {
    const categories = getCategoryData();
    categoryChart.data.labels = Object.keys(categories);
    categoryChart.data.datasets[0].data = Object.values(categories);
    categoryChart.update();
}

function getCategoryData() {
    const categories = {};
    transactions.forEach(transaction => {
        if (transaction.type === 'expense') {
            if (categories[transaction.category]) {
                categories[transaction.category] += transaction.amount;
            } else {
                categories[transaction.category] = transaction.amount;
            }
        }
    });
    return categories;
}
