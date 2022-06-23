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

// set solde on load 
update();

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

  // update operations render 
  update();

  // reset value form
  resetValueForm();
});
