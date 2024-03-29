/***********************************************
*THIS APPLICATION WAS CREATED BY NICHOLAS JONES*
*                      *                       *
************************************************/
//VARIABLES
let player = {
	profilePicture :  "url('images/player.png')",
	name :  "Player1",
	balance :  100000,
	count :  0,
	turn :  true,
	bet : 100,
	aceCount : []/*experimental*/
}
let dealer = {
	count : 0,
	turn :  false,
	hiddenCardValue :  0,
	hiddenCardSuit :  null,
	aceCount : []/*experimental*/
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
>THINGS TO RESET AFTER EACH ROUND : player.count(reset), PLAYER TURN(reset), CARDNUM? ,
	PLAYER BALANCE(reset), ul FOR CARDS(clear), BUTON PROPS
**************************************************************************************************/

$(document).ready(function(){

/////////////VARIABLES/ FUNCTION SETUPS
    let cardNum = 0;
    let cardNum2 = 0;

    //temporary object stores random variables, when called, each time will produce new results
    function TempObj(){
    	this.randomValue = randomValue();
    	//this.randomalue2 = randomValue(),
    	this.randomSuit = randomSuit();

    	this.suitName = DECK[this.randomValue]["card"];
    	this.deckCardValue = DECK[this.randomValue]["value"];
    	this.suitDecal = DECK[this.randomValue]["suits"][this.randomSuit];
    }

    //Random value generator function to be referenced in objects
    let randomValue = function(){
    	return Math.round(Math.random() * (DECK.length - 1))
    }
    //Random suit generator function to be referenced in objects
    let randomSuit = function(){
    	return Math.round(Math.random() * 3)
    }
	let hasAce = function(x, theObject){
    	//x == dealer or player based on parameter input on function call
    	let array = x.aceCount
    	console.log("Ace function shot")
    	//1st, check to see if x has an ace or not dealt to them
    	if(theObject.suitName == "Ace"){
    		x.aceCount.push("ace")
    	}
    	//2nd, if whoever goes over 21 with an ace in inventory, subract 10 (the difference, that makes Ace = 1)
    		if(array.length > 0 && x.count > 21){
    			console.log("yes")
    			x.count = x.count - 10;
    			x.aceCount.pop()
    		}
    	gameInfoUpdate()
    }

    //refresh player/game information
    let gameInfoUpdate = function(){
    	$("#playerName").html(player["name"])
    	$("#bet").html("Bet: $" + player["bet"])
    	$("#countD").html(dealer.count)
    	$("#balance").html("$" + player["balance"])
    	$("#countP").html(player.count)
    }

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
		$(".winLoose").css("display","block")
		$("#results").html(`${player.name} Lost`)
		setTimeout(function(){player["balance"] = player["balance"] - player["bet"]
			gameInfoUpdate();
			console.log(player["name"] + " lost!")
			player["win"] = -1 /*experimental*/
		$(".winLoose").css("display","none")
		assignDecks();},2000)
	}
	//win round
	let win = function(){
		$(".winLoose").css("display","block")
		$("#results").html(`${player.name} Won`)

		setTimeout(function(){player["balance"] = player["balance"] + player["bet"]
			console.log(player["name"] + " wins!")
			player["win"] = 1/*experimental*/
			$(".winLoose").css("display","none")
			assignDecks()},2000)
	}
    function winLoseCheck(){
	    if(dealer.count > player.count && dealer.count <= 21){
	    	return lost();
	    }else if(player.count > dealer.count && player.count <= 21){
	    	return win()
	    }else if(dealer.count > 21){
	    	return win()
	    }else if(dealer.count == player.count){
	    	$(".winLoose").css("display","block")
			$("#results").html(`Draw`)
	    	return setTimeout(function(){
	    		$(".winLoose").css("display","none")
	    		assignDecks()
	    	},2000)
	    }
	   }

    //upon each time, a new random assortment of numbers are created as a new object
    function draw(){
    	console.log("DRAW FUCTION")
    	console.log(player.count)
    	let history = new TempObj()

    		let card = `<li id='playerCard${cardNum}' class='cardFormat playerCard ani'></li>`

    		//prepend. since the list items are pushed left by .append(). 
    		$(".ulPlayer").prepend(card)
    		$(`#playerCard${cardNum}`).css("background-image",history["suitDecal"])
    		player.count = player.count + history["deckCardValue"]
    		$("#countP").html(player.count)

    		hasAce(player,history)
    		console.log("activated")
    		console.log(player.aceCount)

    		gameInfoUpdate()

		if(player.count > 21){
			disabled()//stop player from continuously drawing cards. Players will try to break the game somehow...
			lost()
		}
		//this means that user has doubled down, check to ensure that player has switched turns from dbl down button 
		if(player["turn"] == false){
			if(player.count <= 21){
				dealerDraw()
			}
		}
		
		//for card variable, each new card will be different
    	cardNum ++
    }


	function dealerDraw(){
    	console.log("DEALER DRAW")
    	console.log(" -- " , dealer.aceCount)

    	//reveal dealer card!
	    function hiddenCard(){//assigns hidden card for dealer
	    	let history = new TempObj()
	    	dealer["hiddenCardSuit"] = history["suitDecal"]
	    	dealer["hiddenCardValue"] = history["deckCardValue"]

	    	dealer.count = dealer.count + dealer["hiddenCardValue"]
    		$(`#card2`).css("background-image",dealer["hiddenCardSuit"])

	    	hasAce(dealer,history)
	    } hiddenCard()

    	if(dealer.count <= 16){
    		//time function to stop fast paced gameplay
	    	let time = setInterval(function(){
		    	let history = new TempObj()

		    		if(dealer["turn"]){
		    			let card = `<li id='dealerCard${cardNum2}' class='cardFormat dealerCard ani'></li>`

		    			$(".ulDealer").append(card)
		    			$(`#dealerCard${cardNum2}`).css("background-image",history["suitDecal"])
		    			dealer.count = dealer.count + history["deckCardValue"]
		    			hasAce(dealer,history)
		    			cardNum2 ++
		    			console.log(dealer.count + " DEALER COUNT")
		    		}
		    	if(dealer.count >=16){
		    		//no more dealer draws, clear timeout function and return win/lose check
		    			clearInterval(time);
		    			winLoseCheck()
		    	}

	    	},1000)

    	}else{//dealercardcount is greater than/ equal to 17, no need to select card
    		winLoseCheck()
    	}

    	gameInfoUpdate()
   		
	};

/////////////start of actual functionality after function setup

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
    	console.log("NEW GAME-----------------------")
    	gameInfoUpdate();

    	//restart player/dealer data
    	player.count = 0;
    	dealer.count = 0;
    	player.bet = 100;
    	player.turn = true;
    	dealer.turn = false;
    	player.aceCount = [];
    	dealer.aceCount = [];

    	$(".ulPlayer").html("")
    	$(".ulDealer").html("")
    	$("#playerCards").html("")
    	$("#dealerCards").html("")

    	console.log(player["count"])

    	//for buttons
    	enabled()

    	for(let i = 1;i<=4;i++){
    		let history = new TempObj()

	    	if(i < 2){//only goes once, assigns visible dealer card, and hidden card
	    		$("#dealerCards").append(`<div id='card1' class='cardFormat ani'></div>`)
	    		$(`#card1`).css("background-image",history["suitDecal"])
	    		$("#dealerCards").append(`<div id='card2' class='cardFormat ani'></div>`)
	    		$(`#card2`).css("background-image","url('images/cards/Red_back.jpg')")

	    		dealer.count = dealer.count +  history["deckCardValue"]
	    		hasAce(dealer,history)

	    		i++
	    	}
	    	else if(i > 2){//goes twice for player cards
	    		let history = new TempObj()

	    		$("#playerCards").append(`<div id='card${i}' class='cardFormat ani'></div>`)
	    		$(`#card${i}`).css("background-image",history["suitDecal"])

	    		player.count = player.count + history["deckCardValue"]
	    		console.log("start draw")
	    		hasAce(player, history)
	    		console.log(player.aceCount)
	    	}


    	};
    	gameInfoUpdate()
    }assignDecks();

//end of function jquery
});

//things to add:
	//achievements
	//start menu, select user image
	//select difficulty?
	//ability to upload user image
	//localstorage for player info, start new game
