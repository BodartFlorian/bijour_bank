console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

const selectorHeader = document.querySelectorAll('.navHeader a');
const operationsDebit = document.querySelectorAll('.debit');
const operationsCredit = document.querySelectorAll('.credit');
console.log(selectorHeader);
console.log(operationsDebit);
console.log(operationsCredit);



selectorHeader[0].addEventListener('click', function(){
  console.log('all operations');
  selectorHeader[0].classList.add("active");
  selectorHeader[1].classList.remove("active");
  selectorHeader[2].classList.remove("active");

  operationsDebit.forEach(function(el) {
    el.style.display = 'block';
  });
  operationsCredit.forEach(function(el) {
    el.style.display = 'block';
  });


});
selectorHeader[1].addEventListener('click', function(){
  console.log('all Credit');
  selectorHeader[1].classList.add("active");
  selectorHeader[0].classList.remove("active");
  selectorHeader[2].classList.remove("active");

  operationsDebit.forEach(function(el) {
    el.style.display = 'none';
  });
  operationsCredit.forEach(function(el) {
    el.style.display = 'block';
  });
});
selectorHeader[2].addEventListener('click', function(){
  console.log('all Debit');
  selectorHeader[2].classList.add("active");
  selectorHeader[0].classList.remove("active");
  selectorHeader[1].classList.remove("active");

  operationsCredit.forEach(function(el) {
    el.style.display = 'none';
  });
  operationsDebit.forEach(function(el) {
    el.style.display = 'block';
  });
});