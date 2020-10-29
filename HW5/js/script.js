/*
Name: Kade Hasenfus
Email Address: Kade_Hasenfus@student.uml.edu
Affliation: University of Massachusetts Lowell Computer Science Major
File: cs.uml.edu/~khasenfu/
COMP.4610-201 (91.61) GUI Programming I Assignment: Multiplication table
Copyright © October 28th 2020 by Kade Hasenfus. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the author.
Sources: https://www.w3schools.com/
*/
//get references for submit button, messages field for user, and table
const subButton = document.getElementById("submitButton");
const log = document.getElementById("messageOut");
const table = document.querySelector(".overflow");

//disallowed chars
const noE = 'e';
const noDot = '.';

//event listener on submit button, so when clicked the following happens:
subButton.addEventListener("click", function(){

    //user input values are grabbed, parsed as ints, and stored
    let minXValue = parseInt(document.querySelector("#X-min").value);
    let maxXValue = parseInt(document.querySelector("#X-max").value);
    let minYValue = parseInt(document.querySelector("#Y-min").value);
    let maxYValue = parseInt(document.querySelector("#Y-max").value);

    //user input values are grabbed and stored as strings, for checking if they contain disallowed chars
    let stringMinXValue = document.querySelector("#X-min").value;
    let stringMaxXValue = document.querySelector("#X-max").value;
    let stringMinYValue = document.querySelector("#Y-min").value;
    let stringMaxYValue = document.querySelector("#Y-max").value;

    //disallowing e in input as specified
    if(stringMaxXValue.includes(noE) || stringMinXValue.includes(noE) || stringMaxYValue.includes(noE) || stringMinYValue.includes(noE)) {
      log.textContent = "Check input, no fields should contain e";
      //clear any preexisting table
      table.innerHTML = "";
      //remove tables scroll bars
      table.style.overflow = "";
    }
    //disallowing . in input as specified
    else if(stringMaxXValue.includes(noDot) || stringMinXValue.includes(noDot) || stringMaxYValue.includes(noDot) || stringMinYValue.includes(noDot)) {
      log.textContent = "Check input, no fields should contain decimal numbers, only whole numbers";
      //clear any preexisting table
      table.innerHTML = "";
      //remove tables scroll bars
      table.style.overflow = "";
    }
    else if(isNaN(minXValue)||isNaN(maxXValue)||isNaN(minYValue)||isNaN(maxYValue)){
      log.textContent = "Check input, all fields should be filled with just numbers. You either left a field blank or otherwise entered something which is not a number";
      //clear any preexisting table
      table.innerHTML = "";
      //remove tables scroll bars
      table.style.overflow = "";
    }
    //if the any mins arent less than their cooresponding max's, print corresponding error message
    else if(minXValue > maxXValue || minYValue > maxYValue) {
      log.textContent = "Check input, min(s) should be less than max(s)";
      //clear any preexisting table
      table.innerHTML = "";
      //remove tables scroll bars
      table.style.overflow = "";
    }
    //else if any of the values are out of the range, print corresponding error message
    else if(minXValue < -50 ||minYValue < -50 ||maxXValue > 50 || maxYValue > 50) {
      log.textContent = "Check input, all min values should be greater than or equal to -50 and all max values should be less than or equal to 50";
      //clear any preexisting table
      table.innerHTML = "";
      //remove tables scroll bars
      table.style.overflow = "";
    }
    //else, build the table
    else {
      //clear any preexisting error messages
      log.textContent = "";
      //clear any preexisting table
      table.innerHTML = "";
      //adds scrolling to the overflow, so it isnt there before
      table.style.overflow = "scroll";
      //call createTable with the defined valeus, on the empty div designated to be the table
      createTable({min: minXValue, max: maxXValue}, {min: minYValue, max: maxYValue}, table);
    }
  });

//function to ccreate table, takes definitions for x and y dimensions, as well as parent element to build table in
function createTable(xDef, yDef, parent) {
  //creates the table in the parent
  let table = createChild(parent, "table");
  //gives it borders via class names
  table.className = "table table-bordered";
  //creates table row for x axis table header
  let xHead = createChild(table, "tr");
  //empty element for formatting
  createChild(xHead, "td");
  //for loop which creates table head of x axis and populates it with appropriate value
  for (let x = xDef.min; x <= xDef.max; ++x) {
	   let xhcell = createChild(xHead, "th");
     xhcell.textContent = x;
   }
   //outer for loop creates row(s) for y, creates that y's header, and puts in the value. the inner for loop then populates the rest of that row with children with the calculated values
   for (let y = yDef.min; y <= yDef.max; ++y) {
	    let row = createChild(table, "tr");
      let header = createChild(row, "th");
      header.textContent = y;
      for (let x = xDef.min; x <= xDef.max; ++x) {
  	     let cell = createChild(row, "td");
         cell.className = "bordered" //sets style so each cell has borders
         cell.textContent = x * y;
       }
    }
}


//creates child of parent 'parent' of type 'type'. returns child so it can be modified (i.e. add content)
function createChild(parent, type) {
	let elem = document.createElement(type);
  parent.appendChild(elem);
  return elem;
}
