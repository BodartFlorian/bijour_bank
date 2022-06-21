console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

// variables
const selectorHeader = document.querySelectorAll('.navHeader a');
let operationsDebit = document.querySelectorAll('.debit');
let operationsCredit = document.querySelectorAll('.credit');
const valueInputs = document.querySelectorAll('input');
const submit = document.querySelector('#operationForm');
const select = document.querySelector('#operator');
const title = document.querySelector('#titre');
const desc = document.querySelector('#desc');
const amount = document.querySelector('#montant');
const soldeH1 = document.querySelector('#solde');
let displaySolde = '';


// listener for display specific operations
listenerDisplayOperations();

// add new operation by form
submit.addEventListener('submit', function(event){
  // disable reload page
  event.preventDefault();
  
  // close modal 
  closeModal();

  // get form value & insert into html
  newOperation();

  // calcul last amount with new amount for graph 
  addAmountInArray();

  // update solde value 
  updateSolde();

  // update debit / credit 
  updateOperation();

  // reset All value form
  resetValueForm();
});
