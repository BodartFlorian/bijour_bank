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


// listener for display specific operations
listenerDisplayOperations();

// add new operation by form
submit.addEventListener('submit', function(event){
  // disable reload page
  event.preventDefault();
  
  // close modal 
  const modal = document.querySelector(".reveal-overlay");
  const html = document.querySelector('html');
  modal.style.display = "none";
  html.classList.remove("zf-has-scroll", "is-reveal-open");
  html.removeAttribute('style');

  // get form value & insert into html
  newOperation();


  // calcul last amount with new amount for graph 
  if (select.value == 'debit'){
    let calcul = datapoints[datapoints.length-1] - amount.value;
    datapoints.push(calcul);
    console.log(datapoints);
    console.log('debit');
    // const calculDebit = datapointsDebit[datapointsDebit.length-1] + amount.value;
    // datapointsDebit.push(calculDebit);
    // console.log(datapointsDebit);
  } else if (select.value == 'credit'){
    let calcul = datapoints[datapoints.length-1] + amount.value;
    datapoints.push(calcul);
    console.log(datapoints);
        console.log('credit');
    // const calculcredit = datapointsCredit[datapointsCredit.length-1] + amount.value;
    // datapointsCredit.push(calculcredit);
    // console.log(datapointsCredit);
  }

  // update debit / credit 
  updateOperation();

  // reset All value form
  resetValueForm();
});
