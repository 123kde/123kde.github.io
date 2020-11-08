/*
Name: Kade Hasenfus
Email Address: Kade_Hasenfus@student.uml.edu
Affliation: University of Massachusetts Lowell Computer Science Major
File: cs.uml.edu/~khasenfu/
COMP.4610-201 (91.61) GUI Programming I Assignment: in class 5
Copyright © November 17th 2020 by Kade Hasenfus. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the author.
Sources: https://www.w3schools.com/
*/

//getting the list
const list = document.querySelector("ul");



// ADD NEW ITEM TO END OF LIST

const li_cream = createLastChild(list, "li");
li_cream.textContent = "cream";

// ADD NEW ITEM START OF LIST

const li_kale = createFirstChild(list, "li");
li_kale.textContent = "kale";

// ADD A CLASS OF COOL TO ALL LIST ITEMS
const li_list = document.querySelectorAll("li");

for(li of li_list) {
  li.className = "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
let header = document.querySelector("#page > h2");
const elB = createLastChild(header, "b");
elB.textContent = li_list.length;
elB.setAttribute("style", "background: black; font-size: 10px; border-radius: 10px; padding: 3px");


//helper Functions
function createLastChild(parent, type) {
	let elem = document.createElement(type);
  parent.appendChild(elem);
  return elem;
}

function createFirstChild(parent, type) {
	let elem = document.createElement(type);
  parent.insertBefore(elem, parent.firstChild);
  return elem;
}
