/***********************************************
*THIS APPLICATION WAS CREATED BY NICHOLAS JONES*
*                      *                       *
************************************************/

//VARIABLES
let player = {
	"profilePicture": "url('images/player.png')",
	"name": "Player1",
	"balance": 100000,
	"count": 0,
	"turn": true,
	"bet":100
}
let dealer ={
	"count":0,
	"turn": false,
	"hiddenCard": null
}
const DECK = [
	{"value":1,
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
THINGS TO RESET AFTER EACH ROUND : PLAYERCOUNT(reset), PLAYER TURN(reset), CARDNUM? , PLAYER BALANCE(reset), ul FOR CARDS(clear)
**************************************************************************************************/

$(document).ready(function(){
/////////////VARIABLES/ FUNCTION SETUPS
    let playerCount = player["count"]
    let dealerCount = dealer["count"]
    let cardNum = 0;
    let cardNum2 = 0;
    //Random value generator function to be referenced in objects
    let randomValue = function(){
    	return Math.round(Math.random() * (DECK.length - 1))
    }
    //Random suit generator function to be referenced in objects
    let randomSuit = function(){
    	return Math.round(Math.random() * 3)
    }
    //temporary object stores random variables, when called, each time will produce new results
    function TempObj(){
    	this.randomValue = randomValue(),
    	this.randomalue2 = randomValue(),
    	this.randomSuit = randomSuit(),

    	this.deckCardValue = DECK[this.randomValue]["value"],
    	this.suitDecal = DECK[this.randomValue]["suits"][this.randomSuit]
    }

    //load player/game information
    $("#playerName").html(player["name"])

    let gameInfoUpdate = function(){
    	$("#bet").html("Bet: $" + player["bet"])
    	$("#countD").html(dealerCount)
    	$("#balance").html("$" + player["balance"])
    	$("#countP").html(playerCount)
    }
    gameInfoUpdate();
    console.log(playerCount + " playercount")

   	//Turn changes , disabled button features
	let disabled = function(){
		return $("button").prop("disabled",true).css("filter","opacity(.5)")
	}
	let playerTurnChange = function(){
		if(player["turn"]){

		return player["turn"] = false
		}else if(player["turn"] != true){

		return  player["turn"] = true
		}
	}
	let dealerTurnChange = function(){
		if(dealer["turn"]){
		console.log("3")
		return dealer["turn"] = false

		}else if(dealer["turn"] != true){
		console.log("4")
		return dealer["turn"] = true
		}
	}
	//lost round
	let lost = function(){
		player["balance"] = player["balance"] - player["bet"]
		gameInfoUpdate();
	}
	//dealer turn
	let dealerTurn = function(){
		if(dealer["turn"]){
			while(dealerCount <= 17){
			break;
		}

		}
	}

    //upon each time, a new random assortment of numbers are created as a new object
    function draw(){
    	let history = new TempObj()

    	if(player["turn"]){
    		let card = `<li id='playerCard${cardNum}' class='cardFormat playerCard'></li>`

    		$(".ulPlayer").append(card)
    		$(`#playerCard${cardNum}`).css("background-image",history["suitDecal"])
    		playerCount = playerCount + history["deckCardValue"]
    		$("#countP").html(playerCount)
    	}
    		if(playerCount >= 21){
    			playerTurnChange();
    			disabled();
    			dealerTurnChange();
    			console.log(player["turn"] + " player turn")
				console.log(dealer["turn"] + " dealer turn")
				if(playerCount >= 22){
					alert("bust!")
					lost()
				}
			}
		//for card variable, each new card will be different
    	cardNum ++
    }
    function dealerDraw(){
    	while(dealerCount <= 17){
    		let history = new TempObj()
    		if(dealer["turn"]){
    			let card = `<li id='dealerCard${cardNum2}' class='cardFormat dealerCard'></li>`

    			$(".ulDealer").append(card)
    			$(`#dealerCard${cardNum2}`).css("background-image",history["suitDecal"])
    			console.log(history["suitDecal"])
    			console.log(cardNum2)
    			dealerCount = dealerCount + history["deckCardValue"]
    			cardNum2 ++
    			gameInfoUpdate()
    		}
    		/*if(dealerCount >= 21){
    				break;
				if(dealerCount >= 22){
					break;
				}
			}
		//for card variable, each new card will be different*/
   		}
	}

	//draw card function
/////////////START

	//Adding button functionalities, if a button calls for a next turn, diabled will be called
    $("#hit").on("click",function(){
    	draw();
    })

	//functions break up actions
	console.log(player["turn"] + " ->player start turn")
	console.log(dealer["turn"] + " ->dealer start turn")

	$("#stay").on("click",function(){ 
		playerTurnChange();
		disabled();
		dealerTurnChange();
		console.log(player["turn"] + " player turn")
		console.log(dealer["turn"] + " dealer turn")
		dealerDraw();
	})
	$("#surrender").on("click",function(){ 
		playerTurnChange();
		disabled();
		dealerTurnChange();
		console.log(player["turn"] + " player turn")
		console.log(dealer["turn"] + " dealer turn")
	})
	$("#doubleDown").on("click",function(){ 
		draw();
		playerTurnChange();
		disabled();
		dealerTurnChange();
		player["bet"] = player["bet"] * 2
		console.log(player["bet"])
		gameInfoUpdate()
		dealerDraw();

		console.log(playerCount + " player count")
		console.log(player)
		console.log(dealer)
		console.log(player["turn"] + " player turn")
		console.log(dealer["turn"] + " dealer turn")
	})

	//assign starting cards to dealer and player by random numbers START OF GAME 
    function assignDecks(){
    	for(let i = 1;i<=4;i++){
    		let history2 = new TempObj()
	    	if(i < 2){//only goes once, assigns visible dealer card
	    		$("#dealerCards").append(`<div id='card1' class='cardFormat'></div>`)
	    		$(`#card1`).css("background-image",history2["suitDecal"])
	    		$("#dealerCards").append(`<div id='card2' class='cardFormat'></div>`)
	    		$(`#card2`).css("background-image","url('images/cards/Red_back.jpg')")
	    		dealerCount = dealerCount +  history2["deckCardValue"]

	    		gameInfoUpdate()
	    		i++
	    	}
	    	else if(i > 2){
	    		let history2 = new TempObj()
	    		$("#playerCards").append(`<div id='card${i}' class='cardFormat'></div>`)
	    		$(`#card${i}`).css("background-image",history2["suitDecal"])
	    		playerCount = playerCount + history2["deckCardValue"]
	    		console.log(playerCount + " playercount")
    			gameInfoUpdate()
	    	}
    	};
    }assignDecks();
});

//things to add:
	//achievements
	//start menu, select user image
	//select difficulty
	//ability yo upload user image
	//localstorage for player info, start new game
