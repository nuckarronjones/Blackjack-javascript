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
	"bet":100,
	// 0 - no value //1 = win // -1 = lost
	"win": 0
}
let dealer ={
	"count":0,
	"turn": false,
	"hiddenCardValue": 0,
	"hiddenCardSuit": null,
	// 0 - no value //1 = win // -1 = lost
	"win": 0
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
THINGS TO RESET AFTER EACH ROUND : PLAYERCOUNT(reset), PLAYER TURN(reset), CARDNUM? , PLAYER BALANCE(reset), ul FOR CARDS(clear), BUTON PROPS
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

   	//Turn changes , disabled button features
	let disabled = function(){
		return $("button").prop("disabled",true).css("filter","opacity(.5)")
	}
	let enabled = function(){
		return $("button").prop("disabled",false).css("filter","opacity(1)")
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
		return dealer["turn"] = false

		}else if(dealer["turn"] != true){
		return dealer["turn"] = true
		}
	}
	//lost round
	let lost = function(){
		setTimeout(function(){player["balance"] = player["balance"] - player["bet"]
		gameInfoUpdate();
		console.log(player["name"] + " lost!")
		player["win"] = -1 /*experimental*/
		console.log("player is lost" + player["win"])
		assignDecks();},2000)
		
	}
	//win round
	let win = function(){
		setTimeout(function(){player["balance"] = player["balance"] + player["bet"]
		console.log(player["name"] + " wins!")
		player["win"] = 1/*experimental*/
		console.log("player is win" + player["win"])
		assignDecks()},2000)
	}

    //upon each time, a new random assortment of numbers are created as a new object
    function draw(){
    	console.log("DRAW FUCTION")
    	let history = new TempObj()

    		let card = `<li id='playerCard${cardNum}' class='cardFormat playerCard ani'></li>`

    		//prepend. since the list items are pushed left by .append(). 
    		$(".ulPlayer").prepend(card)
    		$(`#playerCard${cardNum}`).css("background-image",history["suitDecal"])
    		playerCount = playerCount + history["deckCardValue"]
    		$("#countP").html(playerCount)

		if(playerCount > 21){
			lost()
		}
		//this means that user has doubled down, check to ensure that player has switched turns from dbl down button 
		if(player["turn"] == false){
			if(playerCount <= 21){
				dealerDraw()
			}
		}
		
		//for card variable, each new card will be different
    	cardNum ++
    }


	function dealerDraw(){
    	console.log("DEALER DRAW")

    	//reveal card!
    	dealerCount = dealerCount + dealer["hiddenCardValue"]
    	$(`#card2`).css("background-image",dealer["hiddenCardSuit"])
    	gameInfoUpdate()

    	if(dealerCount <= 16){
    		//time function to stop fast paced gameplay
	    	let time = setInterval(function(){
		    	let history = new TempObj()

		    		if(dealer["turn"]){
		    			let card = `<li id='dealerCard${cardNum2}' class='cardFormat dealerCard ani'></li>`

		    			$(".ulDealer").append(card)
		    			$(`#dealerCard${cardNum2}`).css("background-image",history["suitDecal"])
		    			dealerCount = dealerCount + history["deckCardValue"]
		    			cardNum2 ++
		    			console.log(dealerCount + " DEALER COUNT")
		    			gameInfoUpdate()
		    		}
		    	if(dealerCount >=16){
		    		//no more dealer draws, clear timeout function and return win/lose check
		    			clearInterval(time);
		    			winLoseCheck()
		    	}

	    	},1000)

    	}else{//dealercardcount is greater than/ equal to 17, no need to select card
    		winLoseCheck()
    	}

    	//resulting comparison from final dealer draw -> win/lose
    	function winLoseCheck(){
	    	if(dealerCount > playerCount && dealerCount <= 21){
	    		return lost();
	    	}else if(playerCount > dealerCount && playerCount <= 21){
	    		return win()
	    	}else if(dealerCount > 21){
	    		return win()
	    	}else if(dealerCount == playerCount){
	    		console.log("Push!")
	    		return assignDecks()
	    	}
	    }
   		
	};

	//draw card function
/////////////START

	//Adding button functionalities, if a button calls for a next turn, diabled will be called
    $("#hit").on("click",function(){
    	draw();
    })

	//functions break up button actions
	$("#stay").on("click",function(){ 
		playerTurnChange();
		disabled();
		dealerTurnChange();
		dealerDraw();
	})
	$("#surrender").on("click",function(){ 
		//dont change turns, next round player starts, just looses hand. honestly, who would choose this option?
		disabled();
		lost();
	})
	$("#doubleDown").on("click",function(){ 
		player["bet"] = player["bet"] * 2
		playerTurnChange();
		dealerTurnChange();
		disabled();
		draw();

	})

	//assign starting cards to dealer and player by random numbers START OF GAME 
    function assignDecks(){
    	//after each round, changed variables/stylings will be reset
    	console.log("NEW GAME")
    	cardNum = 0;
    	cardNum2 = 0;
    	playerCount = 0;
    	dealerCount = 0;

    	player["turn"] = true;
    	dealer["turn"] = false;
    	player["bet"] = 100;
    	player["win"] = 0;
    	dealer["win"] = 0;

    	$(".ulPlayer").html("")
    	$(".ulDealer").html("")
    	$("#playerCards").html("")
    	$("#dealerCards").html("")

    	//for buttons
    	enabled()

    	for(let i = 1;i<=4;i++){
    		let history2 = new TempObj()
	    	if(i < 2){//only goes once, assigns visible dealer card, and hidden card
	    		$("#dealerCards").append(`<div id='card1' class='cardFormat ani'></div>`)
	    		$(`#card1`).css("background-image",history2["suitDecal"])
	    		$("#dealerCards").append(`<div id='card2' class='cardFormat ani'></div>`)
	    		$(`#card2`).css("background-image","url('images/cards/Red_back.jpg')")

	    		function hiddenCard(){//assigns hidden card for dealer
	    			let history2 = new TempObj()
	    			dealer["hiddenCardSuit"] = history2["suitDecal"]
	    			dealer["hiddenCardValue"] = history2["deckCardValue"]
	    		} hiddenCard()

	    		dealerCount = dealerCount +  history2["deckCardValue"]

	    		gameInfoUpdate()
	    		i++
	    	}
	    	else if(i > 2){//goes twice for player cards
	    		let history2 = new TempObj()
	    		$("#playerCards").append(`<div id='card${i}' class='cardFormat ani'></div>`)
	    		$(`#card${i}`).css("background-image",history2["suitDecal"])
	    		playerCount = playerCount + history2["deckCardValue"]
    			gameInfoUpdate()
	    	}
    	};

    }assignDecks();

//end of function jquery
});

//things to add:
	//achievements
	//start menu, select user image
	//select difficulty
	//ability yo upload user image
	//localstorage for player info, start new game
