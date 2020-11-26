/*
Name: Kade Hasenfus
Email Address: Kade_Hasenfus@student.uml.edu
Affliation: University of Massachusetts Lowell Computer Science Major
File: cs.uml.edu/~khasenfu/
COMP.4610-201 (91.61) GUI Programming I Assignment: jQuery UI
Copyright © November 24th 2020 by Kade Hasenfus. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the author.
Sources: https://www.w3schools.com/
*/

//helper data for tabs
let tabArray = [];
let tabData = {};
let curId = 100;
let currentIndex = 0;

//resets input positions to 0 when creating a new tab
function resetInputs() {
  document.querySelector("#Xmin").value = 0;
  document.querySelector("#Xmax").value = 0;
  document.querySelector("#Ymin").value = 0;
  document.querySelector("#Ymax").value = 0;
  $("#xMinSlider").slider("value", 0);
  $("#xMaxSlider").slider("value", 0);
  $("#yMinSlider").slider("value", 0);
  $("#yMaxSlider").slider("value", 0);
}

//function for creating a new tab
function createTab() {
  let label=`Table ${curId - 99}`;
  $("#tabselect").append($("#linker").html().replace(/%{index}/g, curId).replace(/%{label}/g, label));
  $("#tabContainer").append(`<div id="tab${curId}"><div class="overflow"></div>`).tabs("refresh").tabs("option", "active", tabArray.push(curId) - 1);
  resetInputs();
  createTable();
  curId++;
}

//helper functions for getting tab references
function getTableElementByIndex(curIndex) {
  return $(`div#tab${tabArray[curIndex]}`);
}
function getTableElementById(id) {
  return $(`div#tab${id}`);
}

//form validation (moved to here due to nature of the tabs)
function validateForm() {
  $("#TableForm").validate({
    rules: {
      "Xmin": {
      required: true,
      noDot: true,
      range: [-50, 50],
      },
      "Xmax": {
        required: true,
        noDot: true,
        range: [-50, 50],
      },
      "Ymin": {
        required: true,
        noDot: true,
        range: [-50, 50]
      },
      "Ymax": {
        required: true,
        noDot: true,
        range: [-50, 50],
      }
    },
    messages: {
      Xmin: {
        required: "Please enter a minimum value as an integer. Must only include numbers.",
        range: "Input number must be between -50 to 50."
      },
      Xmax: {
        required: "Please enter a maximum value as an integer. Must only include numbers.",
        range: "Input number must be between -50 to 50."
      },
      Ymin: {
        required: "Please enter a minimum value as an integer. Must only include numbers.",
        range: "Input number must be between -50 to 50."
      },
      Ymax: {
        required: "Please enter a maximum value as an integer. Must only include numbers.",
        range: "Input number must be between -50 to 50."
      },
    },
  });
}

//deletes tab by id from the front end as well as from helper array of tabs
function deleteTabById(selId) {
  $(`li[x-tab-id="${selId}"]`).remove();
  $(`#tabContainer div#tab${selId}`).remove();
  let index = tabArray.indexOf(selId);
  tabArray.splice(index, 1);
  let tabs = $("#tabContainer").tabs("refresh");
  if (currentIndex >= index) {
    currentIndex--;
    tabs.tabs("option", "active", currentIndex);
  }
  $("#tabContainer").tabs("refresh");
}


$(document).ready(function () {
    //inits tabs
    $("#tabContainer").tabs({
      collapsible: true,
      activate: (event, ui) => {
        if (Object.keys(ui.newTab).length !== 0) {
          let selId = Number(ui.newTab.attr('x-tab-id'));
          currentIndex = tabArray.indexOf(selId);
          console.log(`switched to ${selId}, index ${currentIndex}`);
          if (tabData[selId]) {
            document.querySelector("#Xmin").value = tabData[selId].xmin;
            document.querySelector("#Xmax").value = tabData[selId].xmax;
            document.querySelector("#Ymin").value = tabData[selId].ymin;
            document.querySelector("#Ymax").value = tabData[selId].ymax;
            $("#xMinSlider").slider("value", parseInt(tabData[selId].xmin));
            $("#xMaxSlider").slider("value", parseInt(tabData[selId].xmax));
            $("#yMinSlider").slider("value", parseInt(tabData[selId].ymin));
            $("#yMaxSlider").slider("value", parseInt(tabData[selId].ymax));
          }

        }
      }
    });
    //closes tab when its x is clicked on
    $("#tabContainer").on("click", "span.ui-icon-close", function () {
      let li = $(this).closest("li");
      let selId = Number(li.attr("x-tab-id"));
      deleteTabById(selId);
    });

    //initializes text input vals to 0
    $("#Xmin").val(0);
    $("#Xmax").val(0);
    $("#Ymin").val(0);
    $("#Ymax").val(0);

    //method to prevent decimals when validating
    $.validator.addMethod("noDot", function(value, element){
      return !(value.includes('.'))
    }, "decimals are not allowed");

    //deletes all tabs but the selected (active) tab when delete button is clicked
    $("#deleteButton").click(function() {
      let selId = tabArray[currentIndex];
      let newList = tabArray.slice(0, tabArray.length);
      newList.forEach((item) => {
        if (item !== selId) {
          deleteTabById(item);
        }
      });

    //creates new tab when the create new tab button is clicked
    });
    $("#submitButton").click(function() {
      createTab();
    });


    //inits the sliders and binds them to the text input and vice versa
    $("#xMinSlider").slider({
    value: 0,
    step: 1,
    min: -50,
    max: 50,
    slide: function( event, ui ) {
      $("#Xmin").val(ui.value);
      createTable();
      }
    });
    $("#Xmin").change(function () {
      var value = this.value;
      $("#xMinSlider").slider("value", parseInt(value));
      createTable();
    });

    $("#xMaxSlider").slider({
      value: 0,
      step: 1,
      min: -50,
      max: 50,
      slide: function( event, ui ) {
        $("#Xmax").val(ui.value);
        createTable();
      }
    });
    $("#Xmax").change(function () {
      var value = this.value;
      $("#xMaxSlider").slider("value", parseInt(value));
      createTable();
    });

    $("#yMinSlider").slider({
    value: 0,
    step: 1,
    min: -50,
    max: 50,
    slide: function( event, ui ) {
      $("#Ymin").val(ui.value);
      createTable();
    }
    });
    $("#Ymin").change(function () {
      var value = this.value;
      $("#yMinSlider").slider("value", parseInt(value));
      createTable();
    });

    $("#yMaxSlider").slider({
      value: 0,
      step: 1,
      min: -50,
      max: 50,
      slide: function( event, ui ) {
        $("#Ymax").val(ui.value);
        createTable();
      }
    });
    $("#Ymax").change(function () {
      var value = this.value;
      $("#yMaxSlider").slider("value", parseInt(value));
      createTable();
    });

    createTab();

  });

//function to create table, takes definitions for x and y dimensions, as well as parent element to build table in
function createTable() {
  if (currentIndex < 0 || currentIndex >= tabArray.length) {
    createTab();
  }
  validateForm();
  let tab = currentIndex;
  //get parent
  let parent = getTableElementByIndex(tab).find("div.overflow")[0];

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

  if (!tabData[tabArray[currentIndex]]) tabData[tabArray[currentIndex]] = {};

  tabData[tabArray[currentIndex]].xmin = stringMinXValue;
  tabData[tabArray[currentIndex]].xmax = stringMaxXValue;
  tabData[tabArray[currentIndex]].ymin = stringMinYValue;
  tabData[tabArray[currentIndex]].ymax = stringMaxYValue;


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
