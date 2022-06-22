console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});


// variables
const selectorHeader = document.querySelectorAll('.navHeader a');
const divParent = document.querySelector('main .grid-container');
const valueInputs = document.querySelectorAll('input');
const submit = document.querySelector('#operationForm');
const select = document.querySelector('#operator');
const title = document.querySelector('#titre');
const desc = document.querySelector('#desc');
const amount = document.querySelector('#montant');
const soldeH1 = document.querySelector('#solde');
let displaySolde = '';
let datapoints = [];


// storage operations
const operations = [
  {
    title: "salaire",
    desc: "mois de septembre",
    amount: 1200,
    type: "credit"
  },
  {
    title: "loyer",
    desc: "mois d'aout",
    amount: 450,
    type: "debit"
  },
  {
    title: "Vente Boncoin",
    desc: "jeu PS5",
    amount: 25,
    type: "credit"
  },
  {
    title: "Restaurant",
    desc: "mc do",
    amount: 15,
    type: "debit"
  },
  {
    title: "Réalisation de site web",
    desc: "ma mairie",
    amount: 1800,
    type: "credit"
  }
];

function render(array){
  // reset div 
  divParent.innerHTML = "";
  let i = 0;
  let tampon = 0; 
  datapoints = [];
  let calculPercent = (100).toFixed(2);
  array.forEach((operation) => {

    // check type for img src 
    let src = '';
    let alt = '';
    if (operation.type === "debit"){
      src = "./assets/images/depenses.png";
      alt = "debit";
    }
    if (operation.type === "credit"){
      src = "./assets/images/sac-dargent.png";
      alt = "credit";
    }
    
    // calcul percent 
    if (i < 1){
      calculPercent = (100).toFixed(2);
      i++;
    }
    else {
      calculPercent =  ((100 * parseFloat(operation.amount) / parseFloat(tampon))).toFixed(2);
    }

    // calcul total amount 
    if (operation.type === "credit"){
    tampon = parseFloat(tampon) + parseFloat(operation.amount);
    }
    if (operation.type === "debit"){
    tampon = parseFloat(tampon) - parseFloat(operation.amount);
    } 

    // display total amount
    soldeH1.innerHTML = `${tampon}€`;

    datapoints.push(tampon);
    console.log(datapoints);

    // make template 
    const template = `
    <div class="operation ${operation.type}">
      <div class="grid-x grid-padding-x align-middle">
        <div class="cell shrink">
          <div class="picto">
            <img src=${src} alt=${alt}/>
          </div>
        </div>
        <div class="cell auto">
          <div>
            <h2>${operation.title}</h2>
            <small>${operation.desc}</small>
          </div>
        </div>
        <div class="cell small-3 text-right">
          <div>
            <p class="count">${operation.amount}€</p>
            <small>${calculPercent}%</small>
          </div>
        </div>
      </div>
    </div>
    `
    divParent.innerHTML += template;
  });
}
console.log(datapoints);

// listener operation display 
listenerDisplayOperations();

// formulaire 
submit.addEventListener('submit', function(event){
  // disable reload page
  event.preventDefault();
  
  // close modal 
  closeModal();

  // new operation object
  const newOperation = {
    title: title.value,
    desc: desc.value,
    amount: amount.value,
    type: select.value,
  };

  // push new object in array
  operations.push(newOperation);
  render(operations);

  updateSolde();

  // reset value form
  resetValueForm();
});
  
// set solde on load 
updateSolde();








// <block:setup:1>

const DATA_COUNT = datapoints.length + 2;
const labels = [];
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
