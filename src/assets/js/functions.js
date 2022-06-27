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
function update(){
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

// render operations
function render(array){
  // reset div
  divParent.innerHTML = "";
  let i = 0;
  let tampon = 0; 
  datapoints = [];
  labels = [];
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
    let splitTampon = numStr(tampon);
    soldeH1.innerHTML = `${splitTampon}€`;

    // push amount in datapoints for graph
    datapoints.push(tampon);
    labels.push(operation.title);

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
  return datapoints;
}

// split every thousand
function numStr(a, b) {
  a = '' + a;
  b = b || ' ';
  var c = '',
      d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length-1; i >= 0; i--) {
    c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
}