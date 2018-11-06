//VARIABLES
let player = {
	"profilePicture": "url('images/player.png')",
	"name": "Player1",
	"balance": 100000,
	"count": 0,
	"turn": true
}
let dealer ={
	"count":0,
	"turn": false
}
const DECK = [
	{"value":11,
		"card":"Ace",
		"suits":[
			'url("images/cards/AH.jpg")',
			'url("images/cards/AD.jpg")',
			'url("images/cards/AS.jpg")',
			'url("images/cards/AC.jpg")'
			]},
	{"value":2,
		"card":"two",
		"suits":[
			'url("images/cards/2H.jpg")',
			'url("images/cards/2D.jpg")',
			'url("images/cards/2S.jpg")',
			'url("images/cards/2C.jpg")'
			]},
	{"value":3,
		"card":"three",
		"suits":[
			'url("images/cards/3H.jpg")',
			'url("images/cards/3D.jpg")',
			'url("images/cards/3S.jpg")',
			'url("images/cards/3C.jpg")'
			]},
	{"value":4,
		"card":"four",
		"suits":[
			'url("images/cards/4H.jpg")',
			'url("images/cards/4D.jpg")',
			'url("images/cards/4S.jpg")',
			'url("images/cards/4C.jpg")'
			]},
	{"value":5,
		"card":"five",
		"suits":[
			'url("images/cards/5H.jpg")',
			'url("images/cards/5D.jpg")',
			'url("images/cards/5S.jpg")',
			'url("images/cards/5C.jpg")'
			]},
	{"value":6,
		"card":"six",
		"suits":[
			'url("images/cards/6H.jpg")',
			'url("images/cards/6D.jpg")',
			'url("images/cards/6S.jpg")',
			'url("images/cards/6C.jpg")'
			]},
	{"value":7,
		"card":"seven",
		"suits":[
			'url("images/cards/7H.jpg")',
			'url("images/cards/7D.jpg")',
			'url("images/cards/7S.jpg")',
			'url("images/cards/7C.jpg")'
			]},
	{"value":8,
		"card":"eight",
		"suits":[
			'url("images/cards/8H.jpg")',
			'url("images/cards/8D.jpg")',
			'url("images/cards/8S.jpg")',
			'url("images/cards/8C.jpg")'
			]},
	{"value":9,
		"card":"nine",
		"suits":[
			'url("images/cards/9H.jpg")',
			'url("images/cards/9D.jpg")',
			'url("images/cards/9S.jpg")',
			'url("images/cards/9C.jpg")'
			]},
	{"value":10,
		"card":"ten",
		"suits":[
			'url("images/cards/10H.jpg")',
			'url("images/cards/10D.jpg")',
			'url("images/cards/10S.jpg")',
			'url("images/cards/10C.jpg")'
			]},
	{"value":10,
		"card":"jack",
		"suits":[
			'url("images/cards/JH.jpg")',
			'url("images/cards/JD.jpg")',
			'url("images/cards/JS.jpg")',
			'url("images/cards/JC.jpg")'
			]},
	{"value":10,
		"card":"queen",
		"suits":[
			'url("images/cards/QH.jpg")',
			'url("images/cards/QD.jpg")',
			'url("images/cards/QS.jpg")',
			'url("images/cards/QC.jpg")'
			]},
	{"value":10,
		"card":"king",
		"suits":[
			'url("images/cards/KH.jpg")',
			'url("images/cards/KD.jpg")',
			'url("images/cards/KS.jpg")',
			'url("images/cards/KC.jpg")'
			]}
]

/*************************************************************************************************
THINGS TO RESET AFTER EACH HAND : PLAYERCOUNT, PLAYER TURN, CARDNUM , PLAYER BALANCE, ul FOR CARDS 
**************************************************************************************************/

$(document).ready(function(){
/////initiate variables, load info

	//DRY coding, use this and not repetition
    //Random value generator function to be referenced in objects
    let randomValue = function(){
    	return Math.round(Math.random() * (DECK.length - 1))
    }
    //Random suit generator function to be referenced in objects
    let randomSuit = function(){
    	return Math.round(Math.random() * 3)
    }

    let playerCount = player["count"]
    //Draw Player Card

    function TempObj(){
    	this.randomValue = randomValue(),
    	this.randomalue2 = randomValue(),
    	this.randomSuit = randomSuit(),

    	this.deckCardValue = DECK[this.randomValue]["value"],
    	this.suitDecal = DECK[this.randomValue]["suits"][this.randomSuit]
    }

    //load player/game information
    $("#balance").html("$" + player["balance"])
    $("#playerName").html(player["name"])
    $("#countP").append(player["count"])
    $("#countD").append(dealer["count"])		


///////drawing player cards on hit Button
{
	let cardNum = 0;

    $("#hit").on("click",function(){
    	let history = new TempObj()

    	console.log(history)

    	if(player["turn"]){
    		let card = `<li id=playerCard${cardNum} class='cardFormat playerCard'></li>`

    		$(".ulPlayer").append(card)
    		$(`#playerCard${cardNum}`).css("background-image",history["suitDecal"])
    		playerCount = playerCount + history["deckCardValue"]
    		$("#countP").html(playerCount)
    	}
    		if(playerCount >= 21){
    			$("button").prop("disabled",true).css("filter","opacity(.5)")
    		}
    	cardNum ++
    })
}
///////Upon button press, player stays, switching turns to dealer
	$("#stay").on("click",function(){
		$("button").prop("disabled",true).css("filter","opacity(.5)")
	})

//////Assign starting cards to dealer and player by random numbers
/*************************************************************************************Fix below, above works...but below cant count cards right*/
    function assignDecks(){
    	let history2 = new TempObj()
    	console.log(history2)

    	for(let i = 1;i<=4;i++){
	    	if(i < 2){//only goes once, assigns visible dealer card
	    		console.log("dealer")
	    		$("#dealerCards").append(`<div id='card1' class='cardFormat'></div>`)
	    		$(`#card1`).css("background-image",history2["suitDecal"])

	    		$("#dealerCards").append(`<div id='card2' class='cardFormat'></div>`)
	    		$(`#card2`).css("background-image","url('images/cards/Red_back.jpg')")
	    		i++
	    	}
	    	else if(i > 2){
	    		$("#playerCards").append(`<div id='card${i}' class='cardFormat'></div>`)
	    		$(`#card${i}`).css("background-image",history2["suitDecal"])
	    		playerCount = playerCount + history2["deckCardValue"]
    			$("#countP").html(playerCount)
	    	}
    	};
    }assignDecks()
});

//url('images/cards/AD.jpg')"
