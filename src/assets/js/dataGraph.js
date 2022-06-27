function loadGraph(){
    // <block:setup:1>
  const DATA_COUNT = datapoints.length + 2;
  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Compte",
        data: datapoints,
        borderColor: "purple",
        //   fill: true,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  // </block:setup>

  // <block:config:0>
  const config = {
    type: "line",
    data: data,
    options: {
      elements: {
        point: {
          radius: 0,
        },
      },
      responsive: true,
      plugins: {
        legend: false,
        //   title: {
        //     display: true,
        //     text: "Chart.js Line Chart - Cubic interpolation mode",
        //   },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  };

  /*Le contexte du canevas HTML */
  context = document.getElementById("myChart").getContext("2d");
  /* Création du graphique */
  chart = new Chart(context, config);

  /* Générer des données aléatoires */
  function generateData() {
    randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres après la virgule
    addTemperature(new Date().toLocaleTimeString(), randomTemperature);
  }

  function addTemperature(time, temperature) {
    /* Ajoute la valeur en X */
    config.data.labels.push(time);

    /* Ajoute la valeur */
    config.data.datasets[0].data.push(temperature);

    /* Rafraichir le graphique */
    chart.update();
  }
}

loadGraph();

selectorHeader[0].addEventListener('click', function(e) {
  chart.destroy();
  loadGraph();
});
selectorHeader[1].addEventListener('click', function(e) {
  chart.destroy();
  loadGraph();
});
selectorHeader[2].addEventListener('click', function(e) {
  chart.destroy();
  loadGraph();
});
submit.addEventListener('submit', function(e){
  chart.destroy();
  loadGraph();
});