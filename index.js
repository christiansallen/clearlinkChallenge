let created = false;
let body = document.getElementById("container");
let resetAlert = document.createElement("p");
let resetText = document.createTextNode(
  "You need to reset the table before creating a new one"
);
let numberAlert = document.createElement("p");
let numberText = document.createTextNode(
  "Rows and Columns can't be less than 0 or greater than 6 or a decimal."
);
let resetAlertCount = false;
let numberAlertCount = false;

function makeResetButton() {
  //Create a reset button and append to btn-container
  let resetButton = document.createElement("button");
  let buttonText = document.createTextNode("Reset");
  resetButton.appendChild(buttonText);
  btnContainer.appendChild(resetButton);

  //Remove table and change created to false
  resetButton.onclick = function(e) {
    e.preventDefault();
    body.removeChild(tbl);
    btnContainer.removeChild(resetButton);
    if (resetAlertCount) {
      body.removeChild(resetAlert);
    }
    if (numberAlertCount) {
      body.removeChild(numberAlert);
    }
    created = false;
  };
}

function createTable(e) {
  e.preventDefault();
  //If nothing is in rows or columns, default value will be 6.
  const rows = document.getElementById("rows").value || 6;
  const columns = document.getElementById("columns").value || 6;
  let btnContainer = document.getElementById("buttons-container");

  if (!created) {
    if (checkNumbers(rows, columns) === 0) {
      let resetButton = document.createElement("button");
      let buttonText = document.createTextNode("Reset");
      resetButton.appendChild(buttonText);
      btnContainer.appendChild(resetButton);

      return;
    }
    console.log("past checknumbers function");

    //Need to reference the container div in order to insert the table later
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");

    // creating all rows
    for (let i = 1; i <= rows; i++) {
      // creates a table row
      let row = document.createElement("tr");

      //creating the columns with text in them
      for (let j = 1; j <= columns; j++) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(`${i} x ${j} = ${i * j}`);
        //Append cellText inside of cell
        cell.appendChild(cellText);
        //Append cell inside of row
        row.appendChild(cell);
        //Add styling to each cell
        cell.setAttribute("class", "cell");
      }

      // At the end of each column loop, append the row in order to make a new column
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    tbl.setAttribute("class", "multiplication-table");
    // put the <table> into container div
    body.appendChild(tbl);
    // increment count
    created = true;
    makeResetButton();
  } else {
    resetAlert.appendChild(resetText);
    resetAlert.setAttribute("class", "alert");
    body.appendChild(resetAlert);
    resetAlertCount = true;
    return;
  }
}

function checkNumbers(rows, columns) {
  if (rows < 0 || rows > 6 || rows % 1 != 0) {
    console.log("row error");
    numberAlert.appendChild(numberText);
    numberAlert.setAttribute("class", "alert");
    body.appendChild(numberAlert);
    numberAlertCount = true;
    return 0;
  } else if (columns < 0 || columns > 6 || columns % 1 != 0) {
    numberAlert.appendChild(numberText);
    numberAlert.setAttribute("class", "alert");
    body.appendChild(numberAlert);
    numberAlertCount = true;
    return 0;
  } else {
    return;
  }
}
