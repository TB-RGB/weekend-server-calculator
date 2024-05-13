console.log("client.js is sourced!");

function onLoad() {
  axios({
    method: "GET",
    url: "/calculations",
  }).then((response) => {
    console.log(response);

    let calcHist = document.getElementById("resultHistory");

    let prevCalcs = response.data;

    if (!prevCalcs == []) {
      calcHist.innerHTML = "";
      for (let calc of prevCalcs) {
        calcHist.innerHTML += `
                  <div class='history'>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
                  `;
      }
    }
  });
}

onLoad();
let postObj = {};

function sumAdd(event) {
  event.preventDefault();

  postObj.operator = "+";
}

function sumMin(event) {
  event.preventDefault();

  postObj.operator = "-";
}

function sumMult(event) {
  event.preventDefault();

  postObj.operator = "*";
}

function sumDiv(event) {
  event.preventDefault();

  postObj.operator = "/";
}

function clearForms(event) {
  event.preventDefault();

  document.getElementById("numOne").value = "";
  document.getElementById("numTwo").value = "";
}

function sendData(event) {
  event.preventDefault();

  let numOne = document.getElementById("numOne").value;
  let numTwo = document.getElementById("numTwo").value;

  postObj.numOne = numOne;
  postObj.numTwo = numTwo;

  axios({
    method: "POST",
    url: "/calculations",
    data: {
      numOne: postObj.numOne,
      numTwo: postObj.numTwo,
      operator: postObj.operator,
    },
  })
    .then((response) => {
      document.getElementById("numOne").value = "";
      document.getElementById("numTwo").value = "";
      renderCalcs();
    })
    .catch(function (error) {
      console.error('Error on POST /calculations',error);
      alert("ERR MERR GERRD, ERRERR. LERK ERT CERNSERL");
    });
}

function renderCalcs() {
  let calcHist = document.getElementById("resultHistory");
  let lastResult = document.getElementById("recentResult");
  axios({
    method: "GET",
    url: "/calculations",
  })
    .then((response) => {
      console.log(response);

      let prevCalcs = response.data;
      calcHist.innerHTML = "";
      for (let calc of prevCalcs) {
        calcHist.innerHTML += `
            <div class ='history'>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
            `;
      }
      lastResult.innerHTML = `<h2 class='result'>${
        prevCalcs[prevCalcs.length - 1].result
      }</h2>`;
    })
    .catch(function (error) {
      console.error('Error on GET /calculations',error);
      alert("ERR MERR GERRD, ERRERR. LERK ERT CERNSERL");
    });
}
