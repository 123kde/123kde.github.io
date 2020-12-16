/*
Name: Kade Hasenfus
Email Address: Kade_Hasenfus@student.uml.edu
Affliation: University of Massachusetts Lowell Computer Science Major
File: cs.uml.edu/~khasenfu/
COMP.4610-201 (91.61) GUI Programming I Assignment: Scrabble
Copyright © December 10th 2020 by Kade Hasenfus. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the author.
Sources: https://www.w3schools.com/, https://getbootstrap.com/
*/

//global helpen vars

CurrentHand = [];
TilesInHand = 0;
UniqueTileNum = 0;
TileNum = 0;


$(document).ready(function () {
  runGame();
  });

function runGame() {
  boardInit();
  $("#Rack").append("<div id='currentHand'></div>");
  drawTiles(7);
  $("#remainingTiles").html(100 - TileNum);
}

function boardInit() {
  for(i = 1; i <= 7; i++){
		$("#Board" + i).droppable({
				drop: tileDrop,
				classes: {
					"ui-droppable-active": "ui-state-active",
					"ui-droppable-hover": "ui-state-hover"
				},
			}
		);
	}
  for(i = 2; i <= 7; i++){
    $("#Board" + i).droppable('disable');
  }
}

function tileDrop(event, ui) {
  $this = $(this);
  TilesInHand--;
  ui.draggable.position({
		my: "center",
		at: "center",
		of: $this,
		using: function(pos) {
			$(this).animate(pos, 25, "linear");
		}
	});
  if(ui.draggable.prop('currentSrc').includes("Blank")){
		letter = "_"
	}
  else {
    splitDirArr = ui.draggable.prop('currentSrc').split("_")
    letter = splitDirArr[splitDirArr.length - 1][0];
  }
  document.getElementById("nextRound").disabled = false;
  $("#" + ui.draggable.attr('id')).draggable('disable');
  splitIDArr = $(event.target).attr('id').split("d")
  //console.log($(event.target).attr('id'));
  $('#Board' + (parseInt(splitIDArr[1][0]))).droppable('disable');
  $('#Board' + (parseInt(splitIDArr[1][0])+1)).droppable('enable');

  updateScore(letter,$(event.target).prop('currentSrc').includes("Double.png"));
  removeTileFromArr(CurrentHand, letter);



}

function removeTileFromArr (arr, tile) {
  if (arr.indexOf(tile) >= 0) {
	  arr.splice(arr.indexOf(tile), 1);
	}
}

function updateScore(char, bool){
  if(bool){
    $("#score").html(parseInt($("#score").html()) + parseInt(ScrabbleTiles[char]['value']));
  }
  $("#score").html(parseInt($("#score").html()) + parseInt(ScrabbleTiles[char]['value']));
}

function drawTiles(numToDraw) {
  for(i = 0; i < numToDraw; i++){
		rand = Math.floor(Math.random() * 27);
		if(rand < 26){
			var char = String.fromCharCode(65 + rand);
			if(ScrabbleTiles[char]["number-remaining"] != 0){
        (ScrabbleTiles[char]["number-remaining"]) = (ScrabbleTiles[char]["number-remaining"]) - 1;
        renderTile(char);
        CurrentHand.push(char);
			}
			else{ //if tile was out, try drawing a different one again by stepping back loop
				i--;
			}
    }
    else { //blank tile
      if(ScrabbleTiles['_']["number-remaining"] != 0){
        (ScrabbleTiles['_']["number-remaining"]) = (ScrabbleTiles['_']["number-remaining"]) - 1;
        renderTile('_');
        CurrentHand.push('_');
			}
			else{ //if tile was out, try drawing a different one again by stepping back loop
				i--;
			}
    }
  }
}

function renderTile(char) {
  if(char == '_'){
    imgDir = "graphics_data/tiles/Scrabble_Tile_Blank.jpg";
  }
  else {
    imgDir = "graphics_data/tiles/Scrabble_Tile_" + char + ".jpg";
  }
  tile = $("<img class='tile' id='Tile" +  UniqueTileNum +  "' src='" + imgDir + "' >")
  tile.draggable({
			revert: 'invalid',
			scroll: false,
		});
  $("#currentHand").append(tile);
  TilesInHand++;
  UniqueTileNum++;
  TileNum++;

}

function nextWord(){
  $('#Board1').droppable('enable');
  for(i = 2; i < 8; i++){
    $('#Board'+ i).droppable('disable');
  }
	$("#currentHand").remove();
  $("#Rack").append("<div id='currentHand'></div>");
  if(parseInt($("#remainingTiles").html()) >= (7-TilesInHand)){
    TilesInHandCopy = TilesInHand;
    TileNum -= TilesInHandCopy;
    for(i=0; i < TilesInHandCopy; i++){
      renderTile(CurrentHand[i]);
      TilesInHand--;
    }
    drawTiles(7-TilesInHandCopy);
    $("#remainingTiles").html(100 - TileNum);
  }
  else{
    alert("Not enough tiles left to refill hand, resetting game");
    resetGame();
  }
}

function resetGame(){

  CurrentHand = [];
  TilesInHand = 0;
  UniqueTileNum = 0;
  TileNum = 0;

  $("#currentHand").remove();

  $('#Board1').droppable('enable');
  for(i = 2; i < 8; i++){
    $('#Board'+ i).droppable('disable');
  }

  document.getElementById("nextRound").disabled = true;


  $("#score").html('0');

  for (i in ScrabbleTiles) {
    ScrabbleTiles[i]["number-remaining"] = ScrabbleTiles[i]["original-distribution"];
  }

  runGame();

}



function placeholderFunc() {
  //remove me before submission
}

  /*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
   *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
   *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
   *    copied or excerpted for educational purposes with credit to the author.
   *  updated by JMH on November 21, 2015 at 10:27 AM
   *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
   *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
   */

  var ScrabbleTiles = [] ;
  ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
  ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
  ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
  ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
  ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
  ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
  ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
  ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
  ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
  ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
  ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
  ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
  ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
  ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
  ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
  ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
  ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
  ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
  ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;
