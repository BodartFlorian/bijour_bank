// listener for display specific operations
function listenerDisplayOperations(){
selectorHeader[0].addEventListener('click', function(){
  selectorHeader[0].classList.add("active");
  selectorHeader[1].classList.remove("active");
  selectorHeader[2].classList.remove("active");
render(operations); 
});
selectorHeader[1].addEventListener('click', function(){
  selectorHeader[1].classList.add("active");
  selectorHeader[0].classList.remove("active");
  selectorHeader[2].classList.remove("active");
  filter('credit');
});
selectorHeader[2].addEventListener('click', function(){
  selectorHeader[2].classList.add("active");
  selectorHeader[0].classList.remove("active");
  selectorHeader[1].classList.remove("active");
  filter('debit');
});
}

// update amount solde
function updateSolde(){
    if (selectorHeader[0].classList.contains("active")){
        render(operations);
    } else if (selectorHeader[1].classList.contains("active")){
        filter('credit');
    } else if (selectorHeader[2].classList.contains("active")){
         filter('debit');
    }
}

// close modal
function closeModal(){
    const modal = document.querySelector(".reveal-overlay");
    const html = document.querySelector('html');
    if (select.value == "--"){
        alert('choose operator');
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
        html.classList.remove("zf-has-scroll", "is-reveal-open");
        html.removeAttribute('style');
    }
}

// reset value form
function resetValueForm(){
    select.value = '--'; 
    valueInputs.forEach(function(elem) {
      elem.value = '';
  });
}

// filter type ( credit / debit )
function filter(type){
  const filter = operations.filter(operation => operation.type === type);
  render(filter);
}