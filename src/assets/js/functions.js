// listener for display specific operations
function listenerDisplayOperations(){
selectorHeader[0].addEventListener('click', function(){
  selectorHeader[0].classList.add("active");
  selectorHeader[1].classList.remove("active");
  selectorHeader[2].classList.remove("active");

  operationsDebit.forEach(function(el) {
    el.removeAttribute('style');
  });
  operationsCredit.forEach(function(el) {
    el.removeAttribute('style');
  });

    // display amount 
    displaySolde =  parseFloat(datapoints[datapoints.length-1]).toFixed(2);
    soldeH1.innerHTML = `${displaySolde}€`;
});
// listener for display all credits
selectorHeader[1].addEventListener('click', function(){
  selectorHeader[1].classList.add("active");
  selectorHeader[0].classList.remove("active");
  selectorHeader[2].classList.remove("active");

  operationsDebit.forEach(function(el) {
    el.style.display = 'none';
  });
  operationsCredit.forEach(function(el) {
    el.removeAttribute('style');
  });

    // display amount 
    displaySolde = parseFloat(datapointsCredit[datapointsCredit.length-1]).toFixed(2);
    soldeH1.innerHTML = `${displaySolde}€`;
});
// listener for display all debits
selectorHeader[2].addEventListener('click', function(){
  selectorHeader[2].classList.add("active");
  selectorHeader[0].classList.remove("active");
  selectorHeader[1].classList.remove("active");

  operationsCredit.forEach(function(el) {
    el.style.display = 'none';
  });
  operationsDebit.forEach(function(el) {
    el.removeAttribute('style');
  });

    // display amount 
    displaySolde = parseFloat(datapointsDebit[datapointsDebit.length-1]).toFixed(2);
    soldeH1.innerHTML = `${displaySolde}€`;
});
}

// update amount solde
function updateSolde(){
    if (selectorHeader[0].classList.contains("active")){
        displaySolde =  parseFloat(datapoints[datapoints.length-1]).toFixed(2);
        soldeH1.innerHTML = `${displaySolde}€`;
    } else if (selectorHeader[1].classList.contains("active")){
        displaySolde = parseFloat(datapointsCredit[datapointsCredit.length-1]).toFixed(2);
        soldeH1.innerHTML = `${displaySolde}€`;
    } else if (selectorHeader[2].classList.contains("active")){
        displaySolde = parseFloat(datapointsDebit[datapointsDebit.length-1]).toFixed(2);
        soldeH1.innerHTML = `${displaySolde}€`;
    }
}

// close modal
function closeModal(){
    const modal = document.querySelector(".reveal-overlay");
    const html = document.querySelector('html');
    modal.style.display = "none";
    html.classList.remove("zf-has-scroll", "is-reveal-open");
    html.removeAttribute('style');
}

// Create block for new operation
function newOperation(){
  const divParent = document.querySelector('main .grid-container');
  let imgSrc = "";
  const div1 = document.createElement('div');
  div1.setAttribute("class", `operation ${select.value}`);
  const div2 = document.createElement('div');
  div2.setAttribute("class", 'grid-x grid-padding-x align-middle');
  const div3 = document.createElement('div');
  div3.setAttribute("class", 'cell shrink');
  const div4 = document.createElement('div');
  div4.setAttribute("class", 'picto');
  const img = document.createElement('img');
  const div5 = document.createElement('div');
  div5.setAttribute("class", 'cell auto');
  const div6 = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.innerHTML = (title.value);// contenu de l'input title
  const small1 = document.createElement('small');
  small1.innerHTML = (desc.value);// contenu de l'input desc
  const div7 = document.createElement('div');
  div7.setAttribute("class", 'cell small-3 text-right');
  const div8 = document.createElement('div');
  const p = document.createElement('p');
  p.setAttribute("class", 'count');
  p.innerHTML = (amount.value + '€');// contenu de l'input amount
  const small2 = document.createElement('small');
  // calcul percent
  let getpercent = ((100 * parseFloat(amount.value) / parseFloat(datapoints[datapoints.length-1]))).toFixed(2);
  // display percent
  small2.innerHTML = (getpercent + '%');// calcul du pourcentage du montant compéarer au montant global

 //detect value about select
    if (select.value == "--"){
    alert('choose operator');
    modal.style.display = "block";
  } else if (select.value == "credit"){
  imgSrc = "./assets/images/sac-dargent.png";
  } else if (select.value == "debit"){
  imgSrc = "./assets/images/depenses.png";
  }

  // organize new block
  divParent.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(div3);
  div3.appendChild(div4);
  div4.appendChild(img);
  img.setAttribute("src", imgSrc);
  div2.appendChild(div5);
  div5.appendChild(div6);
  div6.appendChild(h2);
  div6.appendChild(small1);
  div2.appendChild(div7);
  div7.appendChild(div8);
  div8.appendChild(p);
  div8.appendChild(small2);
  
}

// update debit / credit
function updateOperation(){
  operationsDebit = document.querySelectorAll('.debit');
  operationsCredit = document.querySelectorAll('.credit');
}

// reset value form
function resetValueForm(){
    select.value = '--'; 
    valueInputs.forEach(function(elem) {
      elem.value = '';
  });
}

// add new value in respective array  
function addAmountInArray(){
      if (select.value == 'debit'){
    let calcul = datapoints[datapoints.length-1] - amount.value;
    datapoints.push(calcul);
    console.log(datapoints);
    const calculDebit =  parseFloat(datapointsDebit[datapointsDebit.length-1]) + parseFloat(amount.value);
    datapointsDebit.push(calculDebit);
    console.log(datapointsDebit);
  } else if (select.value == 'credit'){
    let calcul = parseFloat(datapoints[datapoints.length-1]) + parseFloat(amount.value);
    datapoints.push(calcul);
    console.log(datapoints);
    const calculcredit =  parseFloat(datapointsCredit[datapointsCredit.length-1]) + parseFloat(amount.value);
    datapointsCredit.push(calculcredit);
    console.log(datapointsCredit);
  }
}

// switch graph 
function switchGraph(){
    const selectorHeader = document.querySelectorAll('.navHeader a');
    selectorHeader[0].addEventListener('click', function(){
        data = {
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
    });
    selectorHeader[1].addEventListener('click', function(){
        data = {
        labels: labels,
        datasets: [
            {
            label: "Compte",
            data: datapointsCredit,
            borderColor: "green",
            //   fill: true,
            cubicInterpolationMode: "monotone",
            },
        ],
        };
    });
    selectorHeader[2].addEventListener('click', function(){
        data = {
        labels: labels,
        datasets: [
            {
            label: "Compte",
            data: datapointsDebit,
            borderColor: "red",
            //   fill: true,
            cubicInterpolationMode: "monotone",
            },
        ],
        };
    });
}