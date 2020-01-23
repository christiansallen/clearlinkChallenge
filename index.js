let created = false;
//Need to reference the container div in order to insert the table later
let container = document.getElementById("container");
let resetAlert = document.createElement("p");
let resetText = document.createTextNode(
  "You need to reset the table before creating a new one"
);
let numberAlert = document.createElement("p");
let numberText = document.createTextNode(
  "Rows and Columns can't be less than 0, greater than 6, or a decimal."
);
let resetAlertBool = false;
let numberAlertBool = false;

//CHECK NUMBERS FUNCTION
function checkNumbers(rows, columns) {
  if (rows < 0 || rows > 6 || rows % 1 != 0) {
    numberAlert.appendChild(numberText);
    numberAlert.setAttribute("class", "alert");
    container.appendChild(numberAlert);
    numberAlertBool = true;
    return 0;
  } else if (columns < 0 || columns > 6 || columns % 1 != 0) {
    numberAlert.appendChild(numberText);
    numberAlert.setAttribute("class", "alert");
    container.appendChild(numberAlert);
    numberAlertBool = true;
    return 0;
  } else {
    // console.log("check numbers passed");
    return 1;
  }
}

//CREATE TABLE FUNCTION
function createTable(e) {
  e.preventDefault();
  //If nothing is in rows or columns, default value will be 6.
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");
  const rows = document.getElementById("rows").value || 6;
  const columns = document.getElementById("columns").value || 6;

  if (!created) {
    // toggle created to true
    created = true;

    //Dont create a table if there are invalid numbers
    if (checkNumbers(rows, columns) === 0) {
      return;
    }

    // creating all rows
    for (let i = 1; i <= rows; i++) {
      // creates a table row
      let row = document.createElement("tr");
      row.setAttribute("class", "multiplication-row");

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
    tbl.setAttribute("class", "multiplication-table-js");
    tbl.setAttribute("id", "new-table");
    // put the <table> into container div
    container.appendChild(tbl);
  } else {
    //Dont create another error if there's already one present
    if (resetAlertBool) {
      //   console.log("already has a reset alert");
      return;
    }
    resetAlert.appendChild(resetText);
    resetAlert.setAttribute("class", "alert");
    container.appendChild(resetAlert);
    resetAlertBool = true;
    return;
  }
}

//RESET TABLE FUNCTION
function resetTable(e) {
  e.preventDefault();
  //Need to create this so I can delete a temporary table. Without this, the tables will keep appending onto each other even after 'deletion'.
  let tempTable = document.getElementById("new-table");

  //Remove table and change created to false
  if (container.contains(tempTable)) {
    container.removeChild(tempTable);
  }
  if (resetAlertBool) {
    container.removeChild(resetAlert);
    resetAlertBool = false;
  }
  if (numberAlertBool) {
    container.removeChild(numberAlert);
    numberAlertBool = false;
  }
  document.getElementById("rows").value = null;
  document.getElementById("columns").value = null;
  created = false;
}
