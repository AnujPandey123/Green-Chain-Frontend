// FETCH KPI DATA
fetch("/api/stats")
.then(res => res.json())
.then(data => {
    document.getElementById("totalEmissions").innerText =
        (data.totalEmissions / 1000).toFixed(2) + " tons";

    document.getElementById("totalSales").innerText =
        "₹" + data.totalSales.toLocaleString();

    document.getElementById("totalProfit").innerText =
        "₹" + data.totalProfit.toLocaleString();

    document.getElementById("avgScore").innerText =
        data.avgScore.toFixed(2);
});

// EMISSION BY MODE CHART
fetch("/api/mode-emissions")
.then(res => res.json())
.then(data => {

    const labels = data.map(item => item._id);
    const values = data.map(item => item.totalEmission);

    new Chart(document.getElementById("modeChart"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Carbon Emission (kgCO2)',
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});

// SALES VS PROFIT
fetch("/api/stats")
.then(res => res.json())
.then(data => {

    new Chart(document.getElementById("salesProfitChart"), {
        type: 'doughnut',
        data: {
            labels: ["Total Sales", "Total Profit"],
            datasets: [{
                data: [data.totalSales, data.totalProfit]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});

// TABLE
fetch("/api/transactions")
.then(res => res.json())
.then(data => {
    const table = document.getElementById("transactionTable");

    data.forEach(item => {
        table.innerHTML += `
            <tr>
                <td>${item.Order_ID}</td>
                <td>${item.Region}</td>
                <td>${item.Shipping_Mode}</td>
                <td>${item.Carbon_Emission_kgCO2}</td>
                <td>₹${item.Profit_INR}</td>
            </tr>
        `;
    });
});
