console.log("client.js is sourced!");

let onLoad = () =>{
    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then((response)=>{
            console.log(response);

            let calcHist = document.getElementById("resultHistory");
            
            let prevCalcs = response.data;

            if (!prevCalcs == []){
            calcHist.innerHTML = "";
            for (let calc of prevCalcs) {
              calcHist.innerHTML += `
                  <div>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
                  `;
            }
            // lastResult.innerHTML = `<h2>${
            //   prevCalcs[prevCalcs.length - 1].result
            // }</h2>`;
          }
        })
    }

    
onLoad()
let postObj = {};

let sumAdd = (event) => {
  event.preventDefault();

  postObj.operator = "+";
};

let sumMin = (event) => {
  event.preventDefault();

  postObj.operator = "-";
};

let sumMult = (event) => {
  event.preventDefault();

  postObj.operator = "*";
};

let sumDiv = (event) => {
  event.preventDefault();

  postObj.operator = "/";
};

let clearForms = (event) => {
  event.preventDefault();

  document.getElementById("numOne").value = "";
  document.getElementById("numTwo").value = "";
};

let sendData = (event) => {
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
      console.log(error);
      alert("ERR MERR GERRD, ERRERR. LERK ERT CERNSERL");
    });
};

let = renderCalcs = () => {
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
            <div>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
            `;
      }
      lastResult.innerHTML = `<h2>${
        prevCalcs[prevCalcs.length - 1].result
      }</h2>`;
    })
    .catch(function (error) {
      console.log(error);
      alert("ERR MERR GERRD, ERRERR. LERK ERT CERNSERL");
    });
};


