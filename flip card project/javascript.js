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
	{"value":[1,11],
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

$(document).ready(function(){
	//load player information
    $("#balance").html("$" + player["balance"])
    $("#playerName").html(player["name"])
    $("#b").on("click",function(){console.log("hi")})
    
    //Assign starting cards to dealer and player by random numbers
    function assignDecks(){
    	for(let i = 1;i<=4;i++){
    		console.log(i)
    	let randomcard = Math.round(Math.random() * (DECK.length - 1))
    	let randomsuit = Math.round(Math.random() * 3)
    	if(i < 2){//only goes once, assigns visible dealer card
    		console.log("dealer")
    		$("#dealerCards").append(`<div id='card1' class='cardFormat'></div>`)
    		$(`#card1`).css("background-image",DECK[randomcard]["suits"][randomsuit])

    		$("#dealerCards").append(`<div id='card2' class='cardFormat'></div>`)
    		$(`#card2`).css("background-image","url('images/cards/purple_back.jpg')")
    		i++
    	}
    	else if(i > 2){
    	$("#playerCards").append(`<div id='card${i}' class='cardFormat'></div>`)
    	$(`#card${i}`).css("background-image",DECK[randomcard]["suits"][randomsuit])
    	}
    	}
    }assignDecks()
});

//url('images/cards/AD.jpg')"
