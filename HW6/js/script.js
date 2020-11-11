/*
Name: Kade Hasenfus
Email Address: Kade_Hasenfus@student.uml.edu
Affliation: University of Massachusetts Lowell Computer Science Major
File: cs.uml.edu/~khasenfu/
COMP.4610-201 (91.61) GUI Programming I Assignment: jQuery Validation
Copyright © November 11th 2020 by Kade Hasenfus. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the author.
Sources: https://www.w3schools.com/
*/

$(document).ready(function () {
    $("#TableForm").submit(function(x) {
          x.preventDefault();
          createTable();
    }).validate({
      rules: {
        "Xmin": {
        required: true,
        digits: true,
        range: [-50, 50],
        },
        "Xmax": {
          required: true,
          digits: true,
          range: [-50, 50],
        },
        "Ymin": {
          required: true,
          digits: true,
          range: [-50, 50]
        },
        "Ymax": {
          required: true,
          digits: true,
          range: [-50, 50],
        }
      },
      messages: {
        Xmin: {
          required: "Please enter a minimum value as an integer. Must only include numbers.",
          digits: "Only digits can be input (no decimals)",
          range: "Input number must be between -50 to 50."
        },
        Xmax: {
          required: "Please enter a maximum value as an integer. Must only include numbers.",
          digits: "Only digits can be input (no decimals)",
          range: "Input number must be between -50 to 50."
        },
        Ymin: {
          required: "Please enter a minimum value as an integer. Must only include numbers.",
          digits: "Only digits can be input (no decimals)",
          range: "Input number must be between -50 to 50."
        },
        Ymax: {
          required: "Please enter a maximum value as an integer. Must only include numbers.",
          digits: "Only digits can be input (no decimals)",
          range: "Input number must be between -50 to 50."
        },
      },
    });

  });

//function to create table, takes definitions for x and y dimensions, as well as parent element to build table in
function createTable() {

  //disallowed chars
  const noE = 'e';
  const noDot = '.';

  //get vals
  let minXValue = parseInt(document.querySelector("#Xmin").value);
  let maxXValue = parseInt(document.querySelector("#Xmax").value);
  let minYValue = parseInt(document.querySelector("#Ymin").value);
  let maxYValue = parseInt(document.querySelector("#Ymax").value);

  //user input values are grabbed and stored as strings, for checking if they contain disallowed chars
  let stringMinXValue = document.querySelector("#Xmin").value;
  let stringMaxXValue = document.querySelector("#Xmax").value;
  let stringMinYValue = document.querySelector("#Ymin").value;
  let stringMaxYValue = document.querySelector("#Ymax").value;

  //if user accidentally swapped min and max for x, swap it back
  if(minXValue > maxXValue) {
    let tempMaxX = minXValue;
    minXValue = maxXValue;
    maxXValue = tempMaxX;
  }

  //if user accidentally swapped min and max for y, swap it back
  if(minYValue > maxYValue) {
    let tempMaxY = minYValue;
    minYValue = maxYValue;
    maxYValue = tempMaxY;
  }

  //combine vals (for minimal code alterations)
  let xDef = {min: minXValue, max: maxXValue};
  let yDef = {min: minYValue, max: maxYValue};

  //get parent
  let parent = document.querySelector(".overflow");


  if(stringMaxXValue.includes(noE) || stringMinXValue.includes(noE) || stringMaxYValue.includes(noE) || stringMinYValue.includes(noE)) {
    //clear any preexisting table
    parent.innerHTML = "";
    //remove tables scroll bars
    parent.style.overflow = "";
    }
  //disallowing . in input as specified
  else if(stringMaxXValue.includes(noDot) || stringMinXValue.includes(noDot) || stringMaxYValue.includes(noDot) || stringMinYValue.includes(noDot)) {
    //clear any preexisting table
    parent.innerHTML = "";
    //remove tables scroll bars
    parent.style.overflow = "";
  }
  else if(isNaN(minXValue)||isNaN(maxXValue)||isNaN(minYValue)||isNaN(maxYValue)){
    //clear any preexisting table
    parent.innerHTML = "";
    //remove tables scroll bars
    parent.style.overflow = "";
  }
  //else if any of the values are out of the range, print corresponding error message
  else if(minXValue < -50 ||minYValue < -50 ||maxXValue > 50 || maxYValue > 50) {
    //clear any preexisting table
    parent.innerHTML = "";
    //remove tables scroll bars
    parent.style.overflow = "";
  }
  //else, build the table
  else {
    //clear preexisting tables
    parent.innerHTML = "";

    //adds scrolling to the overflow, so it isnt there before
    parent.style.overflow = "scroll";

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
   }

//creates child of parent 'parent' of type 'type'. returns child so it can be modified (i.e. add content)
function createChild(parent, type) {
	let elem = document.createElement(type);
  parent.appendChild(elem);
  return elem;
}
