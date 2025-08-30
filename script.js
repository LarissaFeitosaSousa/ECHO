let tipoAtual = 'bar';
let chart = null;
const canvas = document.getElementById('meuGrafico');
const ctx = canvas.getContext('2d');

const labels = ["Elogios", "Decepções", "Melhorias"];
const barValues = [12, 25, 45];
const Values = ["12%", "25%", "45%"];
const colors = ["#8e9287ff", "#555555ff", "#020213ff"];

function createChart() {
  if (chart) {
    chart.destroy();
  }

  const data = {
    labels,
    datasets: [{
      data: barValues,
      backgroundColor: colors,
      borderWidth: 1,
      borderRadius: tipoAtual === "bar" ? 6 : 0
    }]
  };

  chart = new Chart(ctx, {
    type: tipoAtual,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            generateLabels(chart) {
              const { data } = chart;
              return data.labels.map((label, i) => ({
                text: label,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: data.datasets[0].backgroundColor[i],
                lineWidth: 0,
                hidden: !chart.getDataVisibility(i),
                index: i
              }));
            }
          }
        }
      },
      scales: tipoAtual === "bar" ? {
        y: { beginAtZero: true }
      } : {}
    }
  });
}

window.onload = () => {
  createChart();

  const botao = document.getElementById('toggleGraph');
  botao.addEventListener('click', () => {
    tipoAtual = tipoAtual === 'bar' ? 'pie' : 'bar';
    createChart();
    botao.textContent = tipoAtual === 'bar' ? '⇆ Alterar gráfico' : '⇆ Alterar gráfico';
  });
};
