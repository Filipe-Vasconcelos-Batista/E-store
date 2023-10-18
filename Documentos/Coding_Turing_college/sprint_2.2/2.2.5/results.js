function displayCharts() {
    let resultsDiv = document.getElementsByClassName('results')[0];
    results.forEach((result, index) => {
        resultsDiv.innerHTML += `<p>Game ${index + 1}: ${result.wpm} WPM, ${result.accuracy.toFixed(2)}% accuracy</p>`;
    });
}
// Function to create the chart
function createCharts() {
    let ctx = document.getElementsByClassName('chart')[0].getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: results.map((_, index) => `Game ${index + 1}`),
            datasets: [{
                label: 'WPM',
                data: results.map(result => result.wpm),
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }, {
                label: 'Accuracy',
                data: results.map(result => result.accuracy),
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true },
                y: { display: true }
            }
        }
    });
}
let results = JSON.parse(localStorage.getItem('typingTestResults')) || [];

displayCharts();
createCharts();

