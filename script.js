const BASE_URL = "https://green-chain-backend.onrender.com"; // 🔥 REPLACE WITH YOUR BACKEND URL

// FETCH KPI DATA
fetch(`${BASE_URL}/api/stats`)
.then(res => {
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
})
.then(data => {
    document.getElementById("totalEmissions").innerText =
        (data.totalEmissions / 1000).toFixed(2) + " tons";

    document.getElementById("totalSales").innerText =
        "₹" + data.totalSales.toLocaleString();

    document.getElementById("totalProfit").innerText =
        "₹" + data.totalProfit.toLocaleString();

    document.getElementById("avgScore").innerText =
        data.avgScore.toFixed(2);
})
.catch(err => {
    console.error("Stats Error:", err);
});

// EMISSION BY MODE CHART
fetch(`${BASE_URL}/api/mode-emissions`)
.then(res => {
    if (!res.ok) throw new Error("Failed to fetch mode emissions");
    return res.json();
})
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
})
.catch(err => {
    console.error("Mode Emission Error:", err);
});

// SALES VS PROFIT
fetch(`${BASE_URL}/api/stats`)
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
})
.catch(err => {
    console.error("Sales Profit Error:", err);
});

// TABLE
fetch(`${BASE_URL}/api/transactions`)
.then(res => {
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return res.json();
})
.then(data => {
    const table = document.getElementById("transactionTable");
    table.innerHTML = "";

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
})
.catch(err => {
    console.error("Transactions Error:", err);
});
